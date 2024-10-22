import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ServDto } from './dto/serv.dto';
import { Stylist } from 'src/entities/stylist.entity';
import { UpdateServDto } from './dto/updateServ.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';



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
        


        console.log('service-category', createServDto.category)

        //category checker
        switch (createServDto.category) {
            case "cut":
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


    findOne(id: number): Promise<Service> {
        return this.servRepository.findOneBy({id})
    }

    update(id: number, recordToUpdate: UpdateServDto): Promise<UpdateResult> {
        return this.servRepository.update(id, recordToUpdate)
    }

    remove(id: number): Promise<DeleteResult>{
        return this.servRepository.delete(id)
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Service>> {
        const queryBuilder = this.servRepository.createQueryBuilder('s')
        queryBuilder.orderBy('s.createdAt', 'DESC')

        return paginate<Service>(queryBuilder, options)
    }
    
}
