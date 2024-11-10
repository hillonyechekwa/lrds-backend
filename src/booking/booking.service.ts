import { Injectable } from '@nestjs/common';
import { Booking } from '@prisma/client';
import { BookingDto } from './dto/booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
    constructor(
        private prisma: PrismaService
    ) {}
    

    async createBooking(bookingDto: BookingDto): Promise<Booking> {

        const bookingData = {
            user: { connect: { id: bookingDto.userId } },
            stylist: { connect: { id: bookingDto.stylistId } },
            services: {
                connect: bookingDto.services.map(serviceId => ({ id: serviceId }))
            },
            startTime: bookingDto.startTime,
            endTime: bookingDto.endTime,
            status: bookingDto.status,
            location: bookingDto.location,
            totalPrice: bookingDto.totalPrice,
    };
        return this.prisma.booking.create({
            data: bookingData
        })

    }
}


