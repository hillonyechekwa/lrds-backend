import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StylistController } from './stylist/stylist.controller';
import { StylistModule } from './stylist/stylist.module';
import { LoggerModule } from './common/middleware/logger/logger.module';

import config from 'ormconfig';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BookingModule } from './booking/booking.module';
import { User } from './entities/user.entity';
import { Stylist } from './entities/stylist.entity';
import { Booking } from './entities/booking.entity';
import { ServModule } from './serv/serv.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(config),
    StylistModule,
    LoggerModule,
    BookingModule,
    ServModule,
    TransactionsModule,
    ],
  controllers: [AppController, StylistController],
  providers: [AppService],
})
export class AppModule {
  entities: [User, Stylist, Booking]
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes()
  }
}
