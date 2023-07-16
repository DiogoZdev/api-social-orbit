import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUserLogin } from './types/login.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwt: JwtService
    ) { }

    validate({ pw, hashedPw }: { pw: string, hashedPw: string }) {
        return bcrypt.compare(pw, hashedPw)
    }

    async signIn({ username, password }: IUserLogin) {
        const { password: hashedPassword, ...user } = await this.userService.findOne(username);
        const validLogin = this.validate({ pw: password, hashedPw: hashedPassword });

        if (user && validLogin) {
            return {
                access_token: this.jwt.sign(user, { secret: process.env.JWT_SECRET })
            }
        }
    }
}
