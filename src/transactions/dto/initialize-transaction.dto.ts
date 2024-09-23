import { IsNumber } from "class-validator";



export class InitilaizeTransactionDto {
    //todo: update this to booking Id instead
    @IsNumber()
    bookingId: number
}