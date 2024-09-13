import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { Repository } from 'typeorm';
import { BookingDto } from './dto/booking.dto';
import { Stylist } from 'src/entities/stylist.entity';
import { User } from 'src/entities/user.entity';
import { Service } from 'src/entities/service.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private bookingRepo: Repository<Booking>,
        @InjectRepository(Stylist)
        private stylistRepo: Repository<Stylist>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Service)
        private servRepo: Repository<Service>
    ) { }
    

    async createBooking(bookingDto: BookingDto): Promise<Booking> {
        const booking = new Booking()
        booking.date = bookingDto.date
        booking.startTime = bookingDto.startTime
        booking.endTime = bookingDto.endTime
        booking.status = bookingDto.status //status at booking createing will always be pending
        booking.totalPrice = bookingDto.totalPrice
        booking.createdAt = bookingDto.createdAt


        //resolve location
        switch (bookingDto.location) {
            case "home":
                booking.location = bookingDto.location
                break;
            case "shop":
                booking.location = bookingDto.location
                break;
        
            default:
                break;
        }                

        //Just in case that didn't work. 😛
        //resolve status
        // switch (bookingDto.status) {
        //     case "":
        //         booking.status = bookingDto.status
        //         break;
        //     case "shop":
        //         booking.status = bookingDto.status
        //         break;
        
        //     default:
        //         break;
        // }

        //resolve user
        const user = await this.userRepo.findOneBy({id: bookingDto.user})

        booking.user = user
        //resolve stylist
        // const stylist = await this.stylistRepo.findOneBy({id: bookingDto.stylist})

        // booking.stylist = stylist


        //resolve service
        const service = await this.servRepo.findOneBy({id: bookingDto.service})

        booking.service = service


        //find a way to resolve service from stylist.
        booking.stylist = service.stylist


        return this.bookingRepo.save(booking)

    }
}


