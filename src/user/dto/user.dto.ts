import { IsString, IsEmail, IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/enums/role.enum";

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    // @IsPhoneNumber()
    // @IsOptional()
    // phoneNumber: string

    @IsString()
    @IsNotEmpty()
    password: string;


    @IsEnum({ type: Role, default: Role.USER })
    @ApiProperty()
    role: Role
}