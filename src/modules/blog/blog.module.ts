import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPostController } from './blog.controller';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BlogPostController],
  providers: [BlogService]
})
export class BlogModule {}
