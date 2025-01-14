import { Injectable, Inject } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { InitilaizeTransactionDto } from './dto/initialize-transaction.dto';
import { PaystackCallbackDto } from './dto/paystackcallback.dto';
import { PaymentStatus, PaystackWebhookDto } from './dto/paystackwebhook.dto';
import { Transaction } from '@prisma/client';
import { PaystackCreateTransactionDto, PaystackCreateTransactionResponseDto, PaystackMetadata, PaystackVerifyTransactionResponseDto } from './dto/paystack.dto';
import axios, { AxiosResponse } from 'axios';
import { PAYSTACK_SUCCESS_STATUS, PAYSTACK_TRANSACTION_INIT_URL, PAYSTACK_TRANSACTION_VERIFY_BASE_URL, PAYSTACK_WEBHOOOK_CRYPTO_ALGO } from './transactions.constants';
import { createHmac, timingSafeEqual } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import paystackConfig from 'src/config/paystack.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class TransactionsService {
    constructor(
        private prisma: PrismaService,

        // readonly configService: ConfigService
        @Inject(paystackConfig.KEY) private paystackConfiguration: ConfigType<typeof paystackConfig>
    ){}


    async initializeTransaction(initTransactionDto: InitilaizeTransactionDto): Promise<Transaction | null> {
        const { bookingId } = initTransactionDto
        
        const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } })
        
        const user = await this.prisma.user.findUnique({ where: { id: booking.userId } })
        
        const metadata: PaystackMetadata = {
            user_id: user.id,
            booking_id: booking.id,
            custom_fields: [
                {
                    display_name: 'Name',
                    variable_name: 'name',
                    value: user.username
                },
                {
                    display_name: 'Email',
                    variable_name: 'email',
                    value: user.email
                }
            ]
        }

        //*expected payload by paystack
        const paystackCreateTransactionDto: PaystackCreateTransactionDto = {
            email: user.email,
            amount: booking.totalPrice,
            metadata
        }

        const paystackCallbackUrl = this.paystackConfiguration.callbackURL
        if (paystackCallbackUrl) {
            paystackCreateTransactionDto.callback_url = paystackCallbackUrl
        }


        const payload = JSON.stringify(paystackCreateTransactionDto)
        //define shape of response from paystack
        let result: PaystackCreateTransactionResponseDto

        try {
            const response = await axios.post<PaystackCreateTransactionResponseDto>(
                PAYSTACK_TRANSACTION_INIT_URL,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${this.paystackConfiguration.secret}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            result = response.data
        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }

        const data = result.data

        if (result.status === true) {
            const transaction = {
                transactionReference: data.reference,
                paymentLink: data.authorization_url,
                transactionStatus: "",
                bookingId:booking.id
            }


            return await this.prisma.transaction.create({ data: transaction })
        }

        return null
    }


    async verifyTransaction(callbackDto: PaystackCallbackDto): Promise<Transaction | null> {
        const transaction = await this.prisma.transaction.findFirst({ where: { transactionReference: callbackDto.reference }  })

        if (!transaction) {
            return null
        }

        const reference = transaction.transactionReference;
        const url = `${PAYSTACK_TRANSACTION_VERIFY_BASE_URL}/${reference}`
        let response: AxiosResponse<PaystackVerifyTransactionResponseDto>


        try {
            response = await axios.get<PaystackVerifyTransactionResponseDto>(url, {
                headers: {
                    Authorization: `Bearer ${this.paystackConfiguration.secret}`
                }
            })
        } catch (error) {
            //handle error
            console.log("transaction verification failed", error.message)
            throw new Error(error.message)
        }

        if (!response) {
            return null
        }

        const result = response.data

        const transactionStatus = result?.data?.status
        const paymentConfirmed = transactionStatus === PAYSTACK_SUCCESS_STATUS

        if (paymentConfirmed) {
            await this.prisma.transaction.update({
            where: { id: transaction.id },
            data: { status: PaymentStatus.PAID, transactionStatus }
            })
        } else {
            await this.prisma.transaction.update({
            where: { id: transaction.id },
            data: { status: PaymentStatus.NOTPAID, transactionStatus }
            })
        }

        return transaction
    }


    async handlePaystackWebhook(webHookDto: PaystackWebhookDto, signature: string): Promise<boolean> {
        if (!webHookDto.data) {
            return false
        }

        //authenticate here

        //*paystack creates and sends hash
        //* we create a hash of the same data

        //*we then compare the values of both hashes to see if they are the same

        let isValidEvent = false

        try {
            const hash = createHmac(
                PAYSTACK_WEBHOOOK_CRYPTO_ALGO,
                this.paystackConfiguration.secret
            )
            .update(JSON.stringify(webHookDto))
            .digest('hex')

            isValidEvent =
                hash &&
                signature &&
                timingSafeEqual(Buffer.from(hash), Buffer.from(signature))
        } catch (error) {
            //handle error
            
        }

        if (!isValidEvent) {
            return false
        }


        const transaction = await this.prisma.transaction.findFirst({ where: { transactionReference: webHookDto.data.reference }  })

        const transactionStatus = webHookDto.data.status
        const paymentcConfirmed = transactionStatus === PAYSTACK_SUCCESS_STATUS


        if (paymentcConfirmed) {
            transaction.status = PaymentStatus.PAID
        } else {
            transaction.status = PaymentStatus.NOTPAID
        }

        transaction.transactionStatus = transactionStatus


        await this.prisma.transaction.update({
            where: { id: transaction.id },
            data: transaction
        })

        return true
    }

    async findMany() {
        return this.prisma.transaction.findMany()
    }
}
 