import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, nullable: false})
    firstName: string

    @Column({unique: true, nullable: false})
    lastName: string

    @Column({unique: true, nullable: false})
    username: string

    @Column({unique: true, nullable: false})
    email: string

    @Column({ nullable: false })
    @Exclude()
    password: string;
}