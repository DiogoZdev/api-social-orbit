import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor (
    private readonly user: UserService
  ) {}

  async validateUser(username: string, password: string) {
    const user: User = await this.user.findOne(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
  }
}
