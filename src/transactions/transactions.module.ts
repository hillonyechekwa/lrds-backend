import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { Transaction } from 'src/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
