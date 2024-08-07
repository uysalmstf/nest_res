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

    async findUserWithFollows(userId: string): Promise<Users> {
        return this.userModel.findById(userId).populate('follows').exec();
      }

    async getFeeds(feedDto: FeedDto, userId: string) {
        const findUser = await this.userModel.findById(userId);
        if (!findUser) throw new HttpException('User Not Found', 400);

const userWithFollows = await this.findUserWithFollows(userId);
const followedUserIds = userWithFollows.follows.map(followedUser => followedUser);
        const posts = await this.postModel
      .find({ createdBy: { $in: followedUserIds } })
      .sort({ createdDate: -1 })  // createdDate alanına göre azalan sırada sıralama
      .populate('createdBy')
      .exec();

    return posts;
    }
}