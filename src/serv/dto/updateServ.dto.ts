import { IsString, IsNumber, IsMilitaryTime, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateServ{
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsNumber()
    @IsOptional()
    price: number
    
    @IsMilitaryTime()
    @IsOptional()
    readonly duration: Date

    @IsOptional()
    @IsOptional()
    category: string

    @IsNotEmpty()
    @IsNumber()
    readonly stylist: number

    @IsNotEmpty()
    @IsNumber()
    readonly bookings: number
}