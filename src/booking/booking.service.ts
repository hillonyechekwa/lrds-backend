import { Injectable } from '@nestjs/common';
import { Booking } from '@prisma/client';
import { BookingDto } from './dto/booking.dto';
// import { UpdateBookingDto } from './dto/updateBooking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
    constructor(
        private prisma: PrismaService
    ) {}
    

    async createBooking(bookingDto: BookingDto): Promise<Booking> {
        //write logic to get total price from dto data
        //get service ids
        const services = bookingDto.services;
        //use ids to return
        const servicePricePromise = services.map(async (serviceId) => {
             return await this.prisma.service.findUnique({
                where: {
                    id: serviceId
                },
                select: {
                    price: true
                }
            })
        })

        const servicePrices = Promise.all(servicePricePromise)
        const servicePricesArray = (await servicePrices).map((prices) => prices.price) 
        
        const total = servicePricesArray.reduce((acc, curr) => {
            return acc + Number(curr)
        }, 0)


        bookingDto.totalPrice = total.toString() + ".00"

        const bookingData = {
            user: { connect: { id: bookingDto.userId } },
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

    //user can update
    // async updateBooking(bookingDto: UpdateBookingDto): Promise<Booking>{}

    //stylist can accept or reject
    // async acceptBooking(bookingDto: UpdateBookingDto): Promise<Booking>{}


    //user can delete
    // async deleteBooking(bookingId: number) {}
}


