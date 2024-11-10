import { Injectable, Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import googleConfig from "src/config/google.config";
import { AuthService } from "../auth.service";
import { Role } from "src/enums/role.enum";




@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, "google") {
    constructor(
        @Inject(googleConfig.KEY)
        private googleConfiguration: ConfigType<typeof googleConfig>,
        private authService: AuthService
    ) {
        super({
            clientID: googleConfiguration.clientID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackURL,
            scope: ['email', 'profile']
        })
    }


    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ) {
        const { name,displayName, emails } = profile
        const user = await this.authService.validateGoogleUser({
            firstName: name.givenName,
            lastName: name.familyName,
            username: displayName || emails[0].value.split('@')[0],
            email: emails[0].value,
            password: "",
            role: Role.USER
        })
        done(null, user)
    }

}