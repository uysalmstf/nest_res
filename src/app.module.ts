import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { FeedModule } from './feed/feed.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    JwtModule.register({global: true,
      secret: '102030'
    }),
    MongooseModule.forRoot("mongodb+srv://root:102030@cluster0.t2vcm.mongodb.net/mongodeneme"),
    UsersModule,
    PostsModule,
    FeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
