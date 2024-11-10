import {IsNumber, IsMilitaryTime, IsNotEmpty, IsEnum, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
// import { Prisma } from "@prisma/client";

import { BookingStatus } from "src/enums/booking-status.enum";
import { ServiceLocation } from "src/enums/location.enum";
// import { BookingStatus } from "@prisma/client";
// import { ServiceLocation } from "@prisma/client";





export class BookingDto{
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly userId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly stylistId: number;

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

    @IsEnum(ServiceLocation) 
    @IsNotEmpty()
    @ApiProperty({enum: ServiceLocation})
    location: ServiceLocation

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    totalPrice: number
}