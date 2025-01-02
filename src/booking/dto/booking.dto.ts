import { IsNotEmpty, IsEnum, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
// import { Prisma } from "@prisma/client";

import { BookingStatus } from "src/enums/booking-status.enum";
import { ServiceLocation } from "src/enums/location.enum";
// import { BookingStatus } from "@prisma/client";
// import { ServiceLocation } from "@prisma/client";





export class BookingDto{
    @ApiProperty()
    userId?: number;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    readonly services: number[];

    @IsNotEmpty()
    @ApiProperty()
    startTime: number; //TODO: remember to fix start time to be string later

    @IsNotEmpty()
    @ApiProperty()
    endTime: number;

    @IsEnum(BookingStatus)
    @ApiProperty({enum: BookingStatus, default: BookingStatus.PENDING})
    status: BookingStatus;

    @IsEnum(ServiceLocation) 
    @ApiProperty({enum: ServiceLocation, default: ServiceLocation.SHOP})
    location: ServiceLocation

    
    @ApiProperty()
    totalPrice?: string
}