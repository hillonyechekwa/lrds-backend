import { Injectable, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
// import { Strategy } from "passport-local";
// import { authConstants } from "../auth.constants";
import { PayloadType } from "src/types/payload.type";
// import jwtConfig from "src/config/jwt.config";
import { ConfigType } from "@nestjs/config";
import refreshJwtConfig from "src/config/refresh-jwt.config";
import { Request } from "express";
import { AuthService } from "../auth.service";





@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "refresh-jwt") {
    constructor(
        @Inject(refreshJwtConfig.KEY)
        private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: refreshJwtConfiguration.secret,
            passReqToCallback: true
        })
    }


    async validate(req: Request, payload: PayloadType) {
        const refreshToken = req.get("authorization").replace("Bearer", "").trim()
        const userId = payload.userId
        return this.authService.validateRefreshToken(userId, refreshToken)
        // return {
        //     userId: payload.userId,
        //     email: payload.email
        // }
    }
}
