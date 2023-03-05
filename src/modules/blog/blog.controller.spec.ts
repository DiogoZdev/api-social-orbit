import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostController } from './blog.controller';
import { BlogService } from './blog.service';

describe('BlogController', () => {
  let controller: BlogPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostController],
      providers: [BlogService],
    }).compile();

    controller = module.get<BlogPostController>(BlogPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
