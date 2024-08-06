import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { FeedModule } from './feed/feed.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [MongooseModule.forRoot("mongodb+srv://root:102030@cluster0.t2vcm.mongodb.net/mongodeneme"),
    UsersModule,
    PostsModule,
    FeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
