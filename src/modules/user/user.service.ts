import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  async create(newUser: CreateUserDto) {
    const user = await this.findOne(newUser.email);

    if (user) {
      return {
        message: 'User already exists',
        status: 400
      }
    }

    const salt = await bcrypt.genSalt(11)
    newUser.password = await bcrypt.hash(newUser.password, salt);

    try {
      const createdUser = await prisma.user.create({
        data: newUser,
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

  findOne(username: string) {
    try {
      return prisma.user.findFirst({
        where: {
          email: username
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
