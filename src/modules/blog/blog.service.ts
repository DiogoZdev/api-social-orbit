import { Injectable } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Injectable()
export class BlogService {
  create(createBlogDto: CreateBlogPostDto) {
    return 'This action adds a new blog';
  }

  findAll() {
    return `This action returns all blog posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog post`;
  }

  update(id: number, updateBlogPostDto: UpdateBlogPostDto) {
    return `This action updates a #${id} blog post`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog post`;
  }
}
