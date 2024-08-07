import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if (!token) {
           throw new HttpException("Token Yok", 400); 
        }

        try {
            const payload = this.jwtService.verify(token)
            request.user = payload.user;
        } catch (error) {
            throw new HttpException(error.message, 400)
        }
        return true;
    }

    private extractTokenFromHeader(request: Request ) : string | undefined {
        return request.headers.authorization?.split(" ")[1];
    }

}