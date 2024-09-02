import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Users } from 'src/schemas/User.schema';
import { Posts } from 'src/schemas/posts.schema';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Users])
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}