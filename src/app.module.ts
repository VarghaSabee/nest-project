import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { DataSource } from 'typeorm';
import { root } from './utils/paths';
import { LikesModule } from './likes/likes.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostService } from './posts/posts.service';
import { Posts } from './posts/posts.entity';
import { Resource, Database } from '@adminjs/typeorm';
import { AdminModule } from '@adminjs/nestjs'
import { User } from './user/user.entity';
import AdminJS from 'adminjs';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketModule } from './socket/socket.module';

AdminJS.registerAdapter({ Resource, Database });

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities,
      logging: true,
      type: 'sqlite',
      synchronize: true,
      database: `${root}/db/db.sqlite`,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    PostModule,
    LikesModule,
    AuthModule,
    TypeOrmModule.forFeature([Posts]),
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [User, Posts],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret'
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret'
        },
      }),
    }),
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
