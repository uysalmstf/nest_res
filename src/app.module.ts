import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { FeedModule } from './feed/feed.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule'ün global olmasını sağlar, böylece diğer modüller de erişebilir.
    }),
    JwtModule.register({global: true,
      secret: process.env.SECRET_KEY
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    PostsModule,
    FeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
