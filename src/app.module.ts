import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './common/middleware/logger/logger.module';

//import config from 'ormconfig';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BookingModule } from './booking/booking.module';
import { BookingController } from './booking/booking.controller';
import { ServController } from './serv/serv.controller';
// import { User } from './entities/user.entity';
// import { Stylist } from './entities/stylist.entity';
// import { Booking } from './entities/booking.entity';
import { ServModule } from './serv/serv.module';
import { TransactionsModule } from './transactions/transactions.module';
// import { DevConfigService } from './common/providers/DevConfigService';
// import { DataSource } from 'typeorm';
// import { dataSourceOptions } from 'db/data-source';
// import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import configuration from './config/configuration';

@Module({
  imports: [
    UserModule,
    AuthModule,
    // TypeOrmModule.forRoot(dataSourceOptions),
    // TypeOrmModule.forFeature([User, Stylist, Transaction, Booking]),
    LoggerModule,
    BookingModule,
    ServModule,
    TransactionsModule,
    // SeedModule,
    PrismaModule,
    ConfigModule.forRoot(configuration)
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // entities: [User, Stylist, Booking]
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(BookingController, ServController) //because of the duration field
  }
}
