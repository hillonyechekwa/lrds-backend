import { IsString, IsNumber, IsMilitaryTime, IsNotEmpty, IsEnum} from "class-validator";
import { ServiceCategories } from "src/enums/service-categories.enum";
import { ApiProperty } from "@nestjs/swagger";





export class ServDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number
    
    @IsMilitaryTime()
    @IsNotEmpty()
    @ApiProperty()
    readonly duration: number

    @IsEnum(ServiceCategories)
    @IsNotEmpty()
    @ApiProperty()
    category: ServiceCategories;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    readonly stylistId: number

}


