import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { StylistEntity } from "./stylist.entity";
import { BookingEntity } from "./booking.entity";


export class UserEntity {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }

    @ApiProperty()    
    id: number
    
    @ApiProperty()
    firstName: string
    
    @ApiProperty()
    lastName: string
    
    @ApiProperty()
    username: string
    
    @ApiProperty()
    email: string

    @Exclude()
    password: string;

    @ApiProperty({required: false})
    profile?: string

    @ApiProperty({required: false, type: StylistEntity})
    stylist?: StylistEntity

    @ApiProperty({isArray: true, type: BookingEntity})
    bookings: []

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date
}