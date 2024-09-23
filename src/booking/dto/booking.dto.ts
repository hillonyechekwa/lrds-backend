import {IsNumber, IsMilitaryTime, IsDateString, IsNotEmpty, IsEnum, IsArray } from "class-validator";


export enum BookingStatus {
    pending = "pending",
    accepted = "accepted",
    rejected = "rejected"
}

export enum ServiceLocationOptions {
    home = "home",
    shop = "shop"
}

export class BookingDto {
    @IsNumber()
    @IsNotEmpty()
    readonly user: number;

    @IsNumber()
    @IsNotEmpty()
    readonly stylist: number;

    @IsArray()
    @IsNumber()
    @IsNotEmpty()
    readonly services: number[];

    @IsDateString()
    @IsNotEmpty()
    readonly date: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    startTime: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    endTime: Date;

    @IsEnum(BookingStatus)
    @IsNotEmpty()
    status: BookingStatus;

    @IsEnum(ServiceLocationOptions) 
    @IsNotEmpty()
    location: ServiceLocationOptions

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number

    @IsDateString()
    @IsNotEmpty()
    readonly createdAt: Date;
}