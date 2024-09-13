import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { User } from 'src/entities/user.entity';
import { Service } from 'src/entities/service.entity';
import { Stylist } from 'src/entities/stylist.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Service, Stylist])],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
