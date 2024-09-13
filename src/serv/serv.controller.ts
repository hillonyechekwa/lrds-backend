import { Controller, Body, Post, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtStylistGuard } from 'src/guards/jwt-stylist.guard';
import { ServDto } from './dto/serv.dto';
import { ServService } from './serv.service';
import { Service } from 'src/entities/service.entity';

@Controller('serv')
export class ServController {
    constructor(
        private readonly servService: ServService
    ){}


    @Post()
    @UseGuards(JwtStylistGuard)
    createService
        (
            @Body() createServDto: ServDto,
            @Request()
            request
    ): Promise<Service> {
        console.log('request.user:', request.user)
        return this.servService.createService(createServDto)
    }
    

    //Get One


    //Get All from stylist



    //Update by a stylist alone
}
