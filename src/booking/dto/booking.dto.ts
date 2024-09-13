import {IsNumber, IsString, IsMilitaryTime, IsDateString, IsNotEmpty } from "class-validator";


export class BookingDto {
    @IsNumber()
    @IsNotEmpty()
    readonly user: number;

    @IsNumber()
    @IsNotEmpty()
    readonly stylist: number;

    @IsNumber()
    @IsNotEmpty()
    readonly service: number;

    @IsDateString()
    @IsNotEmpty()
    readonly date: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    startTime: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    endTime: Date;

    @IsString() //pending, accepted, rejected
    status: string;

    @IsString() //home or shop
    location: string

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number

    @IsDateString()
    @IsNotEmpty()
    readonly createdAt: Date;
}