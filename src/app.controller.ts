import { Controller, Get, Render, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import { AppService } from './app.service';
import { PostService } from './posts/posts.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly postsService: PostService
  ) { }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/about')
  @Render('about')
  async about() {

    return {
      meta: {
        description: "Test nest app",
        title: "Page - About",
        keywords: "uznu edu",
        author: "uznu",
      },
      message: 'Template test!',
    };
  }

  @Get()
  @Render('index')
  async root() {

    const posts = await this.postsService.findAll(0, 9)

    return {
      meta: {
        description: "Test nest app",
        title: "Page - Index",
        keywords: "uznu edu",
        author: "uznu",
      },
      message: 'Template test!',
      posts
    };
  }


  @Sse('mysse')
  sendServerSentEvent(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}

/**/
export interface MessageEvent {
  data: string | object;
  // id?: string;
  // type?: string;
  // retry?: number;
}