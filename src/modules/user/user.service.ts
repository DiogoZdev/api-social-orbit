import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService
  ) {}

  create(createUserDto: CreateUserDto) {

    delete createUserDto.passwordRepeat;

    // to do: check if email is unique
    // to do: hash password

    try {
      return this.prisma.user.create({
        data: createUserDto,
      })
    }
    catch (error) {
      return {
        message: 'An error occurred while creating the user',
        error: error.message
      }
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.user.findUnique({
        where: {
          id,
        },
      })
    }
    catch (error) {
      return {
        message: 'An error occurred while finding the user',
        error: error.message
      }
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.prisma.user.update({
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
      return this.prisma.user.delete({
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
