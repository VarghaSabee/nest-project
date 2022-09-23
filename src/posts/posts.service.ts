import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.interface';
import { Posts } from './posts.entity';

@Injectable()
export class PostService {
  private posts: Post[] = [];

  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  findAll(page: number, size: number) {
    return this.postsRepository.find();
  }

  findById(id: number) {
    return this.postsRepository.findOneBy({ id: id });
  }

  create(post: CreatePostDto) {
    return this.postsRepository.create({});
  }

  update(id: number, post: UpdatePostDto) {
    const index = this.posts.findIndex((p) => p.id === id);

    if (index < 0) throw new Error('Not found');

    const _post: Post = {
      ...this.posts[index],
      ...post,
    };

    this.posts[index] = _post;
    return _post;
  }

  delete(id: number) {
    this.posts = this.posts.filter((p) => p.id !== id);
  }
}
