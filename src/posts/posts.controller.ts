import {
Controller,
Post,
Body,
UsePipes,
UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
constructor(private postsService: PostsService) {}

@Post()
createPost(@Body() createPostDto: CreatePostDto) {
  return this.postsService.createPost(createPostDto);
}
}