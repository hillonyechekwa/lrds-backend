import { Injectable } from "@nestjs/common";
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



    validate(loginDto: LoginDto) {
        return this.authSevice.validateUser(loginDto)
    }
}