import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesController } from './likes.controller';
import { Likes } from './likes.entity';
import { LikesService } from './likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Likes])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
