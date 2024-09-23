import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn({name: "id"})
    id: number

    @Column({name: "first_name", unique: true, nullable: false})
    firstName: string

    @Column({name: "last_name", unique: true, nullable: false})
    lastName: string

    @Column({name: "user_name", unique: true, nullable: false})
    username: string

    @Column({name: "email", unique: true, nullable: false})
    email: string

    @Column({ nullable: false })
    @Exclude()
    password: string;
}