import { IsString, IsNumber, IsMilitaryTime, IsNotEmpty } from "class-validator";

export class ServDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    price: number
    
    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date

    @IsString()
    category: string;

    @IsNotEmpty()
    @IsNumber()
    readonly stylist: number
}