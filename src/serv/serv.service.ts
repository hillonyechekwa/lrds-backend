import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { ServDto } from './dto/serv.dto'
import { UpdateServDto } from './dto/updateServ.dto';
// import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class ServService {
    constructor(
        private prisma: PrismaService
    ) { }
    

    async createService(createServDto: ServDto): Promise<Service> {
        
        
        return this.prisma.service.create({ data: createServDto  })
    }


    findOne(id: number): Promise<Service> {
        return this.prisma.service.findUnique({ where: { id } })
    }

    update(id: number, recordToUpdate: UpdateServDto): Promise<Service> {
        return this.prisma.service.update({ where: { id }, data: recordToUpdate })
    }

    remove(id: number): Promise<Service> {
        return this.prisma.service.delete({where: { id } })
    }

    // async paginate(options: IPaginationOptions): Promise<Pagination<Service>> {
    //     const queryBuilder = this.servRepository.createQueryBuilder('s')
    //     queryBuilder.orderBy('s.createdAt', 'DESC')

    //     return paginate<Service>(queryBuilder, options)
    // }
    
}
