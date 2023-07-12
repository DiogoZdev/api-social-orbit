import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from '../database/prisma.service';

@Injectable()
export class UserService {

  create(createUserDto: CreateUserDto) {

    delete createUserDto.passwordRepeat;

    // to do: check if email is unique
    // to do: hash password

    try {
      return prisma.user.create({
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
      return prisma.user.findUnique({
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
