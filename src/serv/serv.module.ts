import { Module } from '@nestjs/common';
import { ServController } from './serv.controller';
import { ServService } from './serv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { Stylist } from 'src/entities/stylist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Stylist])],
  controllers: [ServController],
  providers: [ServService]
})
export class ServModule {}
