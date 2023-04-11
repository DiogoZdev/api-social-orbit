import { Injectable } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BlogService {

  constructor(
    private prisma: PrismaService
  ) { }

  create(createBlogDto: CreateBlogPostDto) {
    try {
      this.prisma.blogPost.create({
        data: createBlogDto
      })
    }
    catch (error) {
      return {
        error: error.message,
        message: 'An error occurred while creating the blog post.'
      }
    }
  }

  findAll() {
    try {
      return this.prisma.blogPost.findMany()
    }
    catch (error) {
      return {
        error: error.message,
        message: 'An error occurred while fetching the blog posts.'
      }
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.blogPost.findUnique({
        where: {
          id: id
        }
      })
    }
    catch (error) {
      return {
        error: error.message,
        message: `An error occurred while fetching the blog post #${id}.`
      }
    }
  }

  update(id: number, updateBlogPostDto: UpdateBlogPostDto) {
    try {
      return this.prisma.blogPost.update({
        where: {
          id: id
        },
        data: updateBlogPostDto
      })
    }
    catch (error) {
      return {
        error: error.message,
        message: `An error occurred while updating the blog post #${id}.`
      }
    }
  }

  remove(id: number) {
    try {
      return this.prisma.blogPost.delete({
        where: {
          id: id
        }
      })
    }
    catch (error) {
      return {
        error: error.message,
        message: `An error occurred while deleting the blog post #${id}.`
      }
    }
  }
}
