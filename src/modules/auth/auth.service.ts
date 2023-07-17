import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserLogin } from './types/login.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../database/prisma.service';

@Injectable()
export class AuthService {

    constructor(private jwt: JwtService) { }

    async validate({ pw, hashedPw }: { pw: string, hashedPw: string }): Promise<Boolean> {
        return bcrypt.compare(pw, hashedPw);
    }

    async signIn({ username, password }: IUserLogin) {
        const { password: hashedPassword, ...user } = await this.findOneUser(username);
        const validLogin = await this.validate({ pw: password, hashedPw: hashedPassword });

        if (user && validLogin) {
            return {
                access_token: this.jwt.sign(user, { secret: process.env.JWT_SECRET })
            }
        }
        return new UnauthorizedException();
    }

    async hashPw(pw: string) {
        const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS)
        const a =  await bcrypt.hash(pw, salt);
        console.log(a);
        return a;
    }


  async findOneUser(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        email: username
      },
    });

    if (user) return user;
    
    return null;
  }
}
