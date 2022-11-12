import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostService } from './posts.service';

const mockPostService = {
  create: jest.fn(dto => {
    return {
      ...dto,
      id: Math.random()
    }
  })
}

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostService],
    }).overrideProvider(PostService).useValue(mockPostService).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post', () => {
    const createDto = {
      title: "Test post title",
      description: "Test post description"
    }

    expect(controller.create(createDto)).toEqual({
      id: expect.any(Number),
      ...createDto
    });

    expect(mockPostService.create).toHaveBeenCalledWith(createDto);
  });


});
