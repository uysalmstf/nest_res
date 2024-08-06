import {
Controller,
Post,
Body,
UsePipes,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
constructor(private postsService: PostsService) {}

@Post()
createPost(@Body() createPostDto: CreatePostDto) {
  return this.postsService.createPost(createPostDto);
}
}