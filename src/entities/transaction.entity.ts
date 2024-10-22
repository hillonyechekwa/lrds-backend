import { PaymentStatus } from "../transactions/dto/paystackwebhook.dto"
import { ApiProperty } from "@nestjs/swagger";



export class TransactionEntity{

    @ApiProperty()
    id:number

    @ApiProperty()
    transactionReference: string

    @ApiProperty()
    paymentLink: string

    @ApiProperty()
    transactionStatus: string

    @ApiProperty({enum: PaymentStatus})
    status: PaymentStatus

    @ApiProperty()
    bookingId: number;
}