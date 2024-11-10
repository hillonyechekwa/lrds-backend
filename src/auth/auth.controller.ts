import { Controller, Body, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from 'src/guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService:UserService, private readonly authService:AuthService){}

    @Post("signup")
    signUp(@Body() userDto: CreateUserDto) : Promise<User>{
        return this.userService.createUser(userDto)
    }


    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalGuard)
    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }
}
