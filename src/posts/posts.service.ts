import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/createPost.dto";
import { Users } from "../schemas/user.schema";
import { Posts } from "../schemas/posts.schema";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts) private postRepository: Repository<Posts>,
        @InjectRepository(Users) private userRepository: Repository<Users>,
    ) {}

    async createPost(createPostDto: CreatePostDto, userId: string) {
        const findUser = await this.userRepository.findOne({ where: { id: userId }, relations: ['posts'] });
        if (!findUser) throw new HttpException('User Not Found', 404);

        const newPost = this.postRepository.create({ content: createPostDto.content, createdBy: findUser });
        const savedPost = await this.postRepository.save(newPost);

        findUser.posts.push(savedPost);
        await this.userRepository.save(findUser);

        return savedPost;
    }
}