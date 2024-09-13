import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService:UserService, private readonly authService:AuthService){}

    @Post("signup")
    signUp(@Body() userDto: CreateUserDto) : Promise<User>{
        return this.userService.createUser(userDto)
    }

    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }
}
