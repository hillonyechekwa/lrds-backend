import { PartialType } from "@nestjs/swagger";
import { BookingDto } from "./booking.dto";


export class UpdateBookingDto extends PartialType(BookingDto){}