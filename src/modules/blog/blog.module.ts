import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPostController } from './blog.controller';

@Module({
  controllers: [BlogPostController],
  providers: [BlogService]
})
export class BlogModule {}
