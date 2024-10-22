import {IsNumber, IsMilitaryTime, IsDateString, IsNotEmpty, IsEnum, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


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
    @ApiProperty()
    @IsNumber()
    id: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly user: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly stylist: number;

    @IsArray()
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly services: number[];

    @IsMilitaryTime()
    @IsNotEmpty()
    @ApiProperty()
    startTime: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    @ApiProperty()
    endTime: Date;

    @IsEnum(BookingStatus)
    @IsNotEmpty()
    @ApiProperty({enum: BookingStatus})
    status: BookingStatus;

    @IsEnum(ServiceLocationOptions) 
    @IsNotEmpty()
    @ApiProperty({enum: ServiceLocationOptions})
    location: ServiceLocationOptions

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    totalPrice: number

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    readonly createdAt: Date;
}