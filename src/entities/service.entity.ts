import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stylist } from "./stylist.entity";
import { Booking } from "./booking.entity";
import { ServiceCategories } from "src/serv/dto/serv.dto";


@Entity("service")


export class Service {
    @PrimaryGeneratedColumn({name: "id"})
    id: number

    @Column({name: "service_name", unique: true})
    name: string

    @Column({name: "service_description", nullable: true})
    description: string

    @Column({type: "integer"})
    price: number

    @Column('time')
    duration: Date;
    
    @Column({name: "sercie_category", default: ServiceCategories.styling})
    category: ServiceCategories
    
    @ManyToOne(() => Stylist, (stylist) => stylist.services)
    stylist: Stylist


    @ManyToMany(() => Booking, (bookings) => bookings.services)
    bookings: Booking[]
}