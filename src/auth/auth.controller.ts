import { Controller, Body, Post, UseGuards, HttpCode, HttpStatus, Req, Get, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from 'src/guards/local.guard';
import { RefreshAuthGuard } from 'src/guards/refresh.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Public } from 'src/decorators/public.decorator';
import { GoogleAuthGuard } from 'src/guards/google.guard';

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

    @UseGuards(RefreshAuthGuard)
    @Post("refresh")
    refreshToken(@Req() req) {
        return this.authService.refreshToken(req.user.id)
    }


    @UseGuards(JwtAuthGuard)
    @Post("signout")
    signOut(@Req() req) {
        return this.authService.signOut(req.user.userId)
        // this.authService.signOut(req.user.id)
    }


    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get("google/login")
    googleLogin() { }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get("google/callback")
    async googleCallback(@Req() req, @Res() res) {
        if (!req.user) throw new Error("No user data received from google!")

        if(!req.user.email) throw new Error("No email recieved from google")

        const loginDto = {
            email: req.user.email as string
        }

        const response = await this.authService.login(loginDto)

        // res.redirect(`http://localhost:5173?token=${response.accessToken}`)
        res.redirect(`http://localhost:5173?token=${response.refreshToken}`)
     }
    



}
