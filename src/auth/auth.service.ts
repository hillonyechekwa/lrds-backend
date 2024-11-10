import { Injectable, UnauthorizedException} from '@nestjs/common';
// import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from 'src/types/payload.type';
import { AuthEntity } from 'src/entities/auth.entity';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }


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

    async login(loginDto: LoginDto): Promise<AuthEntity> {
        const user = await this.userService.findOne(loginDto);
        const passwordMatched = await bcrypt.compare(
            loginDto.password,
            user.password
        );
        if (passwordMatched) {
            delete user.password;
            const payload: PayloadType = {
                email: user.email,
                userId: user.id
            }

            return {
                accessToken: this.jwtService.sign(payload)
            }
        } else {
            throw new UnauthorizedException("Invalid credentials")
        }
    }
}
