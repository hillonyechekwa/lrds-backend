import { Module } from '@nestjs/common';
import { ServController } from './serv.controller';
import { ServService } from './serv.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServController],
  providers: [ServService]
})
export class ServModule {}
