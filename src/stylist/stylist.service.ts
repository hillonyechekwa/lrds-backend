import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import {Stylist, User} from "@prisma/client"


@Injectable()
export class StylistService {
    constructor(
        private prisma: PrismaService
        // private serviceRepository: Repository<Service>
    ) { }
    

    async findStylistById(userId: number): Promise<Stylist> {
        const stylist = await this.prisma.stylist.findUnique({where: {userId: userId}})
        if (!stylist) {
            throw new UnauthorizedException()
        }

        return stylist
    }
    //for general search
    async findStylistByUsername(username: string): Promise<Stylist | User>{
        return this.prisma.user.findUnique({ where: { username: username }  })
    }

    // async findStylitsByEmail(email: string): Promise<Stylist>{
    //     return this.stylistRepository.findOneBy({user: {email: email}})
    // }

    // async createService(servDto: ServDto): Promise<Service> {
    //     const service = await this.serviceRepository.save(servDto)
    //     return service
    // }
}
