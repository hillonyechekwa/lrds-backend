import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService
    ) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() bookingDto: BookingDto, @Request() req) {
        const userId = req.user['userId']
        bookingDto.userId = userId
        return this.bookingService.createBooking(bookingDto)
    }

    //Get all bookings by user


    //Get one booking by user to see details


    //update boking by stylist to accept or reject booking
}
