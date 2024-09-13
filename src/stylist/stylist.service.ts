import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stylist } from 'src/entities/stylist.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StylistService {
    constructor(
        @InjectRepository(Stylist)
        private stylistRepository: Repository<Stylist>,
        // private serviceRepository: Repository<Service>
    ) { }
    

    async findStylistById(userId: number): Promise<Stylist> {
        const stylist = await this.stylistRepository.findOneBy({user: {id: userId}})
        if (!stylist) {
            throw new UnauthorizedException()
        }

        return stylist
    }
    //for general search
    async findStylistByUsername(username: string): Promise<Stylist>{
        return this.stylistRepository.findOneBy({user: {username: username}})
    }

    // async findStylitsByEmail(email: string): Promise<Stylist>{
    //     return this.stylistRepository.findOneBy({user: {email: email}})
    // }

    // async createService(servDto: ServDto): Promise<Service> {
    //     const service = await this.serviceRepository.save(servDto)
    //     return service
    // }
}
