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

    async signIn({ email, password }: IUserLogin) {
        const { password: hashedPassword, isActive, ...user } = await this.findOneUser(email);
        const validLogin = await this.validate({ pw: password, hashedPw: hashedPassword });

        if (user && validLogin) {
            return {
                token: this.jwt.sign(user, { secret: process.env.JWT_SECRET }),
                user
            }
        }
        return new UnauthorizedException();
    }

    async hashPw(pw: string) {
        const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS)
        const hashed =  await bcrypt.hash(pw, salt);
        return hashed;
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
