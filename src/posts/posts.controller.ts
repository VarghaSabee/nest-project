import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { PostService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostService) {
    }

    @Get()
    findAll() {
        return this.postsService.findAll()
    }

    @Get(":id")
    getById(@Param('id') id: number) {
        return this.postsService.findById(id)
    }

    @Post()
    create(@Body() body: any) {
        return this.postsService.create(body)
    }

    @Put(":id")
    update(@Param('id') id: number, @Body() body: any) {
        return this.postsService.update(id, body)
    }

    @Delete(":id")
    delete(@Param('id') id: number) {
        return this.postsService.delete(id)
    }
}
