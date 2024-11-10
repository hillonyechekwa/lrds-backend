import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BookingEntity } from "./booking.entity";
import { Role } from "src/enums/role.enum";


export class UserEntity {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }

    @ApiProperty()    
    id: number
    
    @ApiProperty()
    firstName: string
    
    @ApiProperty()
    lastName: string
    
    @ApiProperty()
    username: string
    
    @ApiProperty()
    email: string

    @Exclude()
    password: string;

    @ApiProperty({type: 'enum', default: Role.USER})
    role: Role

    @ApiProperty({nullable: true}) //*TODO: SHOULD PROBABLY BE EXCLUDED TOO, NOT SURE YET.
    hashedRefreshToken: string;

    @ApiProperty({required: false})
    profile?: string

    @ApiProperty({isArray: true, type: BookingEntity})
    bookings: []

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date
}