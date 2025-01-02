import { IsString, IsNotEmpty, IsEnum} from "class-validator";
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

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    price: string
    
    @IsNotEmpty()
    @ApiProperty()
    readonly duration: number

    @IsEnum(ServiceCategories)
    @IsNotEmpty()
    @ApiProperty()
    category: ServiceCategories;

    @ApiProperty()
    stylistId?: number
}


