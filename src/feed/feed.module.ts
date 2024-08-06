import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/schemas/User.schema';
import { Posts, PostSchema } from 'src/schemas/posts.schema';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Posts.name,
        schema: PostSchema,
      },
      {
        name: Users.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}