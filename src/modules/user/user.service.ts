import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from '../database/prisma.service';
import { AuthService } from '../auth/auth.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

  constructor(
    private auth: AuthService
  ) {}

  async create(newUser: CreateUserDto) {
    const user = await this.auth.findOneUser(newUser.email);

    if (user) {
      return {
        message: 'User already exists',
        status: 400
      }
    }

    newUser.password = await this.auth.hashPw(newUser.password);

    try {
      newUser.memberSince = new Date().toISOString();

      const createdUser = await prisma.user.create({
        data: newUser as Prisma.UserCreateInput,
      })

      return {
        message: 'User created successfully',
        user: createdUser.email
      }
    }
    catch (error) {
      return {
        message: 'An error occurred while creating the user',
        error: error.message
      }
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      })
    }
    catch (error) {
      return {
        message: 'An error occurred while updating the user',
        error: error.message
      }
    }
  }

  remove(id: number) {
    try {
      return prisma.user.delete({
        where: {
          id,
        },
      })
    }
    catch (error) {
      return {
        message: 'An error occurred while deleting the user',
        error: error.message
      }
    }
  }
}
