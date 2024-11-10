import { Injectable, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
// import { Strategy } from "passport-local";
// import { authConstants } from "../auth.constants";
import { PayloadType } from "src/types/payload.type";
import jwtConfig from "src/config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { AuthService } from "../auth.service";





@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(jwtConfig.KEY)
        private jwtConfiguration: ConfigType<typeof jwtConfig>,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfiguration.secret
        })
    }


    async validate(payload: PayloadType) {
        const userId = payload.userId
        return this.authService.validateJwtUser(userId)
    }
}
