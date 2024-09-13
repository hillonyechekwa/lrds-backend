import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional } from "class-validator";

export class UpdateUserDto{

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    username: string;

    @IsEmail()
    @IsOptional()
    email: string;

    // @IsPhoneNumber()
    // @IsOptional()
    // phoneNumber: string

    @IsString()
    @IsNotEmpty()
    password: string;
}