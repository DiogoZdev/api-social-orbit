import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(user: CreateUserDto) {
    return 'This action adds a new user';
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(user: UpdateUserDto) {
    return `This action updates a #${user} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
