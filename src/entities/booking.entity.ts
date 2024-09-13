import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user.entity";
import { Stylist } from "./stylist.entity";
import { Service } from "./service.entity";




@Entity("booking")

export class Booking {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToOne(() => Stylist, (stylist) => stylist.id)
    stylist: Stylist

    @ManyToOne(() => Service, (service) => service.id)
    service: Service

    @Column('date')
    date: Date

    @Column('time')
    startTime: Date

    @Column('time')
    endTime: Date

    @Column('text')
    status: string

    @Column('text')
    location: string

    @Column('int')
    totalPrice: number

    @Column('time')
    createdAt: Date

    @Column('time')
    updatedAt: Date
}
