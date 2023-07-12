import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { prisma } from '../database/prisma.service';

@Injectable()
export class ProjectService {

  create(createProjectDto: CreateProjectDto) {
    try {
      return prisma.project.create({
        data: createProjectDto,
      });
    } catch (error) {

      return {
        message: "Something went wrong while creating the project",
        error: error.message
      };
    }
  }

  findAll() {
    try {
      return prisma.project.findMany();
    }
    catch (error) {
      return {
        message: "Something went wrong while finding the projects",
        error: error.message
      };
    }
  }

  findOne(id: number) {
    try {
      return prisma.project.findUnique({
        where: {
          id: id,
        },
      });
    }
    catch (error) {
      return {
        message: `Something went wrong while finding the project #${id}`,
        error: error.message
      };
    }
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      return prisma.project.update({
        where: {
          id: id,
        },
        data: updateProjectDto,
      });
    }
    catch (error) {
      return {
        message: `Something went wrong while updating the project #${id}`,
        error: error.message
      };
    }
  }

  remove(id: number) {
    try {
      return prisma.project.delete({
        where: {
          id: id,
        },
      });
    }
    catch (error) {
      return {
        message: `Something went wrong while deleting the project #${id}`,
        error: error.message
      };
    }
  }
}
