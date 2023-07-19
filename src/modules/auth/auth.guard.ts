import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard {

    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.getToken(request);

        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: process.env.JWT_SECRET }
            );
            request.user = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    getToken(req: Request) {
        const [type, token] = req.headers.authorization?.split(' ');
        return type === 'Bearer' ? token : null;
    }
}