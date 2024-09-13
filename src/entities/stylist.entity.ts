import { User } from "./user.entity";
import { Service } from "./service.entity"
import { Entity, JoinColumn, OneToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("stylist")

export class Stylist {
    
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)

    @JoinColumn()

    user: User

    @OneToMany(() => Service, (services) => services.stylist)
    services: Service[]
}