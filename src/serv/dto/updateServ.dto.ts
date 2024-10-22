import { IsString, IsNumber, IsMilitaryTime,IsOptional, IsEnum } from "class-validator";
import { ServiceCategories } from "./serv.dto";

export class UpdateServDto{
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsNumber()
    @IsOptional()
    price: number
    
    @IsMilitaryTime()
    @IsOptional()
    readonly duration: number

    @IsEnum(ServiceCategories)
    @IsOptional()
    category: ServiceCategories
}