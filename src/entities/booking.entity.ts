import { UserEntity } from "./user.entity";
import { StylistEntity } from "./stylist.entity";
import { ServiceEntity } from "./service.entity";
// import { BookingStatus, ServiceLocationOptions } from "src/booking/dto/booking.dto";
import { BookingStatus, ServiceLocation } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { TransactionEntity } from "./transaction.entity";




export class BookingEntity {
    @ApiProperty()
    id: number

    @ApiProperty()
    userId: number

    @ApiProperty()
    user: UserEntity

    @ApiProperty()
    stylistId: number

    @ApiProperty()
    stylist: StylistEntity

    constructor({ user, stylist, ...data }: Partial<BookingEntity>) {
        Object.assign(this, data)

        if (user) {
            this.user = new UserEntity(user)
        }

        if (stylist) {
            this.stylist = new StylistEntity(stylist)
        }
    }
    
    @ApiProperty({type: ServiceEntity, isArray: true})
    services: []
    
    @ApiProperty()
    startTime: Date

    @ApiProperty()
    endTime: Date

    @ApiProperty({enum: BookingStatus, default: BookingStatus.PENDING})
    status: BookingStatus

    @ApiProperty({enum: ServiceLocation, default: ServiceLocation.SHOP})
    location: ServiceLocation

    @ApiProperty()
    totalPrice: number

    @ApiProperty()
    createdAt: Date

    @ApiProperty({type: TransactionEntity})
    transaction: TransactionEntity
}
