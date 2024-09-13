import { JWTStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { StylistModule } from 'src/stylist/stylist.module';
import { authConstants } from "./auth.constants";


@Module({
  imports: [
    UserModule,
    StylistModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d'
      }
    }),
    PassportModule
  ],
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
