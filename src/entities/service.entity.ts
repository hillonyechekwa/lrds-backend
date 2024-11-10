import { StylistEntity } from "./stylist.entity";
import { BookingEntity } from "./booking.entity";
import { ServiceCategories } from "src/enums/service-categories.enum";
import { ApiProperty } from "@nestjs/swagger";


export class ServiceEntity {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    price: number

    @ApiProperty()
    duration: number
    
    @ApiProperty({enum: ServiceCategories})
    category: ServiceCategories
    
    @ApiProperty()
    stylist: StylistEntity

    @ApiProperty()
    stylistId: number

    constructor({ stylist, ...data }: Partial<ServiceEntity>) {
        Object.assign(this, data)

        if (stylist) {
            this.stylist = new StylistEntity(stylist)
        }
    }

    @ApiProperty({isArray: true, type: BookingEntity})
    bookings: []
}