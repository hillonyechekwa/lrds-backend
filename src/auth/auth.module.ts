import { JWTStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { StylistModule } from 'src/stylist/stylist.module';
import { authConstants } from "./auth.constants";
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local.strategy';


@Module({
  imports: [
    UserModule,
    StylistModule,
    PrismaModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d'
      }
    }),
    PassportModule
  ],
  providers: [AuthService, JWTStrategy, UserService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
