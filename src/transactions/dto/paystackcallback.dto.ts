import { IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"


export class PaystackCallbackDto {
    @IsString()
    reference: string
}