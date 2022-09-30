import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/posts/posts.entity';
import { Repository } from 'typeorm';
import { CreateLikesDto } from './dto/create-like-dto';
import { Likes } from './likes.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    // @InjectRepository(Posts)
    private readonly likesRepository: Repository<Likes>,
    // private readonly postsRepository: Repository<Posts>,
  ) { }

  findAll(page: number, size: number) {
    return this.likesRepository.find({
      relations: {
        post: true
      }
    });
  }

  async create(createDTO: CreateLikesDto) {
    // const post = await this.postsRepository.findOneBy({ id: createDTO.postId });

    // if (!post) {
    //   throw new HttpException(
    //     `Post with given id = ${createDTO.postId} not found!`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    return this.likesRepository.create({
      post: { id: createDTO.postId },
    });
  }

  async delete(id: number) {
    await this.likesRepository.delete({ id: id });
  }
}
