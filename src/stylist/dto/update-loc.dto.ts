import { IsString, IsNotEmpty } from "class-validator";



export class UpdateLocationDto {
    @IsString()
    @IsNotEmpty()
    long: string

    @IsString()
    @IsNotEmpty()
    lat: string
}