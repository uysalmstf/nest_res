import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [MongooseModule.forRoot("mongodb+srv://root:102030@cluster0.t2vcm.mongodb.net/mongodeneme"),
    UsersModule,
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
