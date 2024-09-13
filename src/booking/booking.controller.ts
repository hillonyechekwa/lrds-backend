import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';

@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService
    ) { }
    

    @Post()
    create(@Body() bookingDto: BookingDto) {
        return this.bookingService.createBooking(bookingDto)
    }

    //Get all bookings by user


    //Get one booking by user to see details


    //update boking by stylist to accept or reject booking
}
