import { IsString, IsNumber, IsMilitaryTime, IsNotEmpty, IsEnum } from "class-validator";



export enum ServiceCategories {
    styling = 'styling',
    cut = 'cut',
    treatement = 'treatment'
}
export class ServDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    price: number
    
    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date

    @IsEnum(ServiceCategories)
    @IsNotEmpty()
    category: ServiceCategories;

    @IsNotEmpty()
    @IsNumber()
    readonly stylist: number
}


