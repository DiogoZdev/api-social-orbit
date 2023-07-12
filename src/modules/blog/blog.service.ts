import { Injectable } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { prisma } from 'src/modules/database/prisma.service';

@Injectable()
export class BlogService {

  create(createBlogDto: CreateBlogPostDto) {
    try {
      prisma.blogPost.create({
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
      return prisma.blogPost.findMany()
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
      return prisma.blogPost.findUnique({
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
      return prisma.blogPost.update({
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
      return prisma.blogPost.delete({
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
