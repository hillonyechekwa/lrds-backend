import { Module } from '@nestjs/common';
import { StylistController } from './stylist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StylistService } from './stylist.service';
import { Stylist } from 'src/entities/stylist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stylist])],
  controllers: [StylistController],
  providers: [StylistService],
  exports: [StylistService]
})
export class StylistModule {}
