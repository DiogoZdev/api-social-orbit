import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPostController } from './blog.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [BlogPostController],
  providers: [BlogService]
})
export class BlogModule {}
