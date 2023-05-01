import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { HashService } from '../utils/hash.service';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    private hash: HashService
  ) { }

  async create(newUser: CreateUserDto) {
    const user = await this.findOne(newUser.email);

    if (user) {
      return {
        code: 400,
        message: 'User already exists'
      };
    }

    if (newUser.password !== newUser.passwordRepeat) {
      return {
        code: 400,
        message: 'Passwords do not match'
      };
    }

    delete newUser.passwordRepeat;

    await this.hash.hashString(newUser.password).then((result) => {
      newUser.password = result;
    });

    try {
      await this.prisma.user.create({
        data: newUser,
      });

      return {
        code: 201,
        message: `User ${newUser.name} created successfully`,
      }
    }
    catch (error) {
      return {
        code: 500,
        message: 'An error occurred while creating the user',
      }
    }
  }

  findOne(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
      return {
        code: 200,
        message: 'User updated successfully',
      }
    }
    catch (error) {
      return {
        code: 500,
        message: 'An error occurred while updating the user',
        error: error.message
      }
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return {
        code: 200,
        message: 'User deleted successfully',
      }
    }
    catch (error) {
      return {
        code: 500,
        message: 'An error occurred while deleting the user',
        error: error.message
      }
    }
  }
}
