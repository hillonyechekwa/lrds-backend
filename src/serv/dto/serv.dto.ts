import { IsString, IsNumber, IsMilitaryTime, IsNotEmpty, IsEnum, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



export enum ServiceCategories {
    styling = 'styling',
    cut = 'cut',
    treatement = 'treatment'
}

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
    readonly duration: number

    @IsEnum(ServiceCategories)
    @IsNotEmpty()
    category: ServiceCategories;

    @IsNotEmpty()
    @IsNumber()
    readonly stylist: number

    @IsNotEmpty()
    @IsDateString()
    readonly createdAt: Date

}


