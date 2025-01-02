import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { LoginDto } from "../dto/login.dto";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authSevice: AuthService) {
        super({
            usernameField: 'email'
        })
    }



    validate(email: string, password: string) {
        if(password === "") throw new UnauthorizedException("Please provide a password")
        return this.authSevice.validateUser(email, password)
    }
}