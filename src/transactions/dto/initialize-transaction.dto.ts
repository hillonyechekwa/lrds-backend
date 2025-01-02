import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



export class InitilaizeTransactionDto {
    //todo: update this to booking Id instead
    @ApiProperty()
    @IsNumber()
    bookingId: number
}