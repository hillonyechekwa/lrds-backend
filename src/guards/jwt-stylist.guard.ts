import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { PayloadType } from "src/types/payload.type";



@Injectable()
export class JwtStylistGuard extends AuthGuard('jwt') {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }

    handleRequest<Tuser = PayloadType>(err: any, user: any): Tuser {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        console.log(user); 
        if (user.stylistId) {
            return user;
        }
        throw err || new UnauthorizedException()
    }
}