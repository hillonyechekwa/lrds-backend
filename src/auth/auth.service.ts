import { Inject, Injectable, UnauthorizedException} from '@nestjs/common';
// import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from 'src/types/payload.type';
import { AuthEntity } from 'src/entities/auth.entity';
import refreshJwtConfig from 'src/config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2'


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
    ) { }

    //for the local Strategy
    async validateUser(loginDto: LoginDto) {
        const { email, password } = loginDto
        const user = await this.userService.findByEmail(email)
        if (!user) {
            throw new UnauthorizedException("user not found!")
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            throw new UnauthorizedException("invalid credentials")
        }

        return {id: user.id}
    }
    //used in refresh strategy
    async validateRefreshToken(userId: number, refreshToken: string) {
        //refreshToken is not in hashed form here.
        const user = await this.userService.findById(userId)
        if (!user || user.hashedRefreshToken) {
            throw new UnauthorizedException("Invalid Refresh Token!")
        }

        const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken)
        if (!refreshTokenMatches) {
            throw new UnauthorizedException("Invalid Refresh Token")
        }

        return {
            userId
        }
    }

    async login(loginDto: LoginDto): Promise<AuthEntity> {
        const user = await this.userService.findOne(loginDto);
        const passwordMatched = await bcrypt.compare(
            loginDto.password,
            user.password
        );

        if (passwordMatched) {
            delete user.password;
            // const payload: PayloadType = {
            //     email: user.email,
            //     userId: user.id
            // }

            
            // const accessToken = this.jwtService.sign(payload)
            // const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig)

            const { accessToken, refreshToken } = await this.generateTokens(user.id)
            const hashedRefreshToken = await argon2.hash(refreshToken)
            await this.userService.updateHashedRefreshToken(user.id, hashedRefreshToken)
            return {
                accessToken,
                refreshToken
            }
        } else {
            throw new UnauthorizedException("Invalid credentials")
        }
    }

    //easier token generation
    async generateTokens(userId: number) {
        const payload: PayloadType = {
                userId: userId
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ])

        return {
            accessToken,
            refreshToken
        }
    }
    //for the refresh token api route
    async refreshToken(userId: number) {
        const { accessToken, refreshToken } = await this.generateTokens(userId)
        const hashedRefreshToken = await argon2.hash(refreshToken)
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken)
        return {
            accessToken,
            refreshToken
        }
    }


    async signOut(userId: number) {
        await this.userService.updateHashedRefreshToken(userId, null)
        return "You have signed out!!"
    }
}
