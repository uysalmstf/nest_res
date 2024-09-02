import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from 'src/schemas/User.schema';
import { Posts } from 'src/schemas/posts.schema';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Users])
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}