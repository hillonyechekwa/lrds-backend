import { IsString } from "class-validator"


export class PaystackCallbackDto {
    @IsString()
    reference: string
}