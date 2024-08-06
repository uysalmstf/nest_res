import { HttpException, Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Posts } from "src/schemas/posts.schema";
import { CreatePostDto } from "./dto/createPost.dto";
import { Users } from "src/schemas/user.schema";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Posts.name) private postModel: Model<Posts>,
        @InjectModel(Users.name) private userModel: Model<Users>,
    ) {}

    async createPost(createPostDto: CreatePostDto) {
        const findUser = await this.userModel.findById(createPostDto.userId);
        if (!findUser) throw new HttpException('User Not Found', 404);

        const newPost = new this.postModel({ content: createPostDto.content, createdBy: createPostDto.userId });
        const savedPost = await newPost.save();
        await findUser.updateOne({
          $push: {
            posts: savedPost._id,
          },
        });
        return savedPost;
    }
}