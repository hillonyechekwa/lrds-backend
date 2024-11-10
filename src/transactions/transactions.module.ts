import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { ConfigModule} from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import paystackConfig from 'src/config/paystack.config';

@Module({
  imports: [PrismaModule, ConfigModule.forFeature(paystackConfig)],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
