import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional } from "class-validator";

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    // @IsPhoneNumber()
    // @IsOptional()
    // phoneNumber: string

    @IsString()
    @IsNotEmpty()
    password: string;
}