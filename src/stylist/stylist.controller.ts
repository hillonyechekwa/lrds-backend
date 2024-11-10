import { Controller} from '@nestjs/common';
import { StylistService } from './stylist.service';

@Controller('stylist')
export class StylistController {
    constructor(private readonly stylistService: StylistService){}


    // @Post()
    // createServ(@Body() servDto:ServDto) {
    //     return this.stylistService.createService(servDto)
    // }
}
