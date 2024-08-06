import { HttpException, Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Posts } from "src/schemas/posts.schema";
import { Users } from "src/schemas/user.schema";
import { FeedDto } from "./dto/feed.dto";

@Injectable()
export class FeedService {
    constructor(
        @InjectModel(Posts.name) private postModel: Model<Posts>,
        @InjectModel(Users.name) private userModel: Model<Users>,
    ) {}

    async getFeeds(feedDto: FeedDto) {
        const findUser = await this.userModel.findById(feedDto.userId);
        if (!findUser) throw new HttpException('User Not Found', 404);

       
    }
}