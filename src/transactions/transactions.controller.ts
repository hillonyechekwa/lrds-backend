import { Controller, Get, Post, Body, Query, HttpStatus, HttpCode, BadRequestException, Headers } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { InitilaizeTransactionDto } from './dto/initialize-transaction.dto';
import { PaystackWebhookDto } from './dto/paystackwebhook.dto';
import { PaystackCallbackDto } from './dto/paystackcallback.dto';
import { Transaction } from 'src/entities/transaction.entity';
import { PAYSTACK_WEBHOOK_SIGNATURE_KEY } from './transactions.constants';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }
    
    //*initialization of a transaction by a user.
    @Post("/initialize")
    async initalizeTransaction(@Body() initTransactionDto: InitilaizeTransactionDto) {
        return await this.transactionsService.initializeTransaction(initTransactionDto)
    }
    //* get callback from paystack to verify transaction with callback data.
    @Get('/callback')
    async verifyTransaction(@Query() query: PaystackCallbackDto): Promise<Transaction>{
        return await this.transactionsService.verifyTransaction(query)
    }
    //* server to server comms between this api server and the paystack api server
    //* recieves notifs about payment status(refund, succesful) from paystack
    @Post('/webhook')
    @HttpCode(HttpStatus.OK) //* expected response from webhook is 200 Ok not 201
    async paymentWebhookHandler(
        @Body() webHookDto: PaystackWebhookDto,
        @Headers() headers = {}
    ) {
        const result = await this.transactionsService.handlePaystackWebhook(webHookDto, `${headers[PAYSTACK_WEBHOOK_SIGNATURE_KEY]}`)

        if (!result) {
            throw new BadRequestException()
        }
    }

    @Get()
    async findTransactions() {
        return await this.transactionsService.findMany()
    }

}
