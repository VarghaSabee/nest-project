import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Likes } from './likes.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly postsRepository: Repository<Likes>,
  ) {}

  findAll(page: number, size: number) {
    return this.postsRepository.find();
  }

  create(createDTO: any) {
    const post = this.postsRepository.create({
      ...createDTO,
    });
    return this.postsRepository.save(post);
  }

  async delete(id: number) {
    await this.postsRepository.delete({ id: id });
  }
}
