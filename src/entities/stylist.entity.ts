// import { User } from "./user.entity";
import { ServiceEntity } from "./service.entity"
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { BookingEntity } from "./booking.entity";




export class StylistEntity {
    constructor(partial: Partial<StylistEntity>) {
        Object.assign(this, partial)
    }
    

    @ApiProperty()    
    id: number

    @ApiProperty({type: UserEntity})
    user: UserEntity

    @ApiProperty()
    userid: number

    @ApiProperty()
    rating: number

    @ApiProperty({isArray: true, type: ServiceEntity})
    services: []

    @ApiProperty({isArray: true, type: BookingEntity})
    booked: []

    @ApiProperty()
    createdAt: Date
}