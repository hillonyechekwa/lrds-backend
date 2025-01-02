import { IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"


export class PaystackCallbackDto {
    @IsString()
    reference: string

     @IsString()
     @IsOptional()  // Makes this field optional
     trxref?: string;
}