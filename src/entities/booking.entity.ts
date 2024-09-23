import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, ManyToMany } from "typeorm";
import { User } from "./user.entity";
import { Stylist } from "./stylist.entity";
import { Service } from "./service.entity";
import { BookingStatus, ServiceLocationOptions } from "src/booking/dto/booking.dto";




@Entity("booking")

export class Booking {
    @PrimaryGeneratedColumn({name: "booking_id"})
    id: number

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToOne(() => Stylist, (stylist) => stylist.id)
    stylist: Stylist
    
    @ManyToMany(() => Service, (service) => service.bookings)
    services: Service[]

    @Column('date')
    date: Date

    @Column('time')
    startTime: Date

    @Column('time')
    endTime: Date

    @Column({name: 'booking_status', default: BookingStatus.pending})
    status: BookingStatus

    @Column({name: "booking_location", default: ServiceLocationOptions.shop})
    location: ServiceLocationOptions

    @Column('int')
    totalPrice: number

    @Column('time')
    createdAt: Date

    @Column('time')
    updatedAt: Date
}
