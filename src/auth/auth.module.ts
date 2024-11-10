import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
// import { authConstants } from "./auth.constants";
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import jwtConfig from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from 'src/config/refresh-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { GoogleAuthStrategy } from './strategies/google.strategy';
import googleConfig from 'src/config/google.config';


@Module({
  imports: [
    UserModule,
    PrismaModule,
    // JwtModule.register({
    //   secret: authConstants.secret,
    //   signOptions: {
    //     expiresIn: '1d'
    //   }
    // }),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PassportModule
  ],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy, GoogleAuthStrategy, UserService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
