import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Stylist } from "./stylist.entity";
import { Booking } from "./booking.entity";


@Entity("service")


export class Service {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column('time')
    duration: Date;

    @Column('text')
    category: string
    
    @ManyToOne(() => Stylist, (stylist) => stylist.services)
    stylist: Stylist


    @OneToMany(() => Booking, (bookings) => bookings.service)
    bookings: Booking[]
}