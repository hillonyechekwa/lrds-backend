import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { ServDto } from './dto/serv.dto';
import { Stylist } from 'src/entities/stylist.entity';



@Injectable()
export class ServService {
    constructor(
        @InjectRepository(Service)
        private servRepository: Repository<Service>,
        @InjectRepository(Stylist)
        private stylistRepository: Repository<Stylist>
    ) { }
    

    async createService(createServDto: ServDto): Promise<Service> {
        const service = new Service()
        service.name = createServDto.name;
        service.price = createServDto.price;
        service.description = createServDto.description
        service.price = createServDto.price
        service.duration = createServDto.duration
        // service.category = createServDto.category


        console.log('service-category', createServDto.category)

        //category checker
        switch (createServDto.category) {
            case "haircut":
                service.category = createServDto.category
                break;
            case "styling":
                service.category = createServDto.category
                break;
            case "treatment":
                service.category = createServDto.category
                break;

            default: //not sure what to do when the category is wrong yet!!
                break;
        }

        const stylist = await this.stylistRepository.findOneBy({ id: createServDto.stylist})

        console.log(stylist)


        service.stylist = stylist
        
        return this.servRepository.save(service)
    }
}
