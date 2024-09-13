import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { StylistService } from './stylist.service';
import { ServDto } from '../serv/dto/serv.dto';

@Controller('stylist')
export class StylistController {
    constructor(private readonly stylistService: StylistService){}


    // @Post()
    // createServ(@Body() servDto:ServDto) {
    //     return this.stylistService.createService(servDto)
    // }
}
