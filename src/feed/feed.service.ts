import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { FeedDto } from './dto/feed.dto';
import { Posts } from "../schemas/posts.schema";
import { Users } from "../schemas/user.schema";

@Injectable()
export class FeedService {
    constructor(
      @InjectRepository(Posts) private postRepository: Repository<Posts>,
      @InjectRepository(Users) private userRepository: Repository<Users>,
    ) {}

    async findUserWithFollows(userId: string): Promise<Users> {
        return this.userRepository.findOne({
            where: { id: userId },
            relations: ['follows'],
        });
    }

    async getFeeds(feedDto: FeedDto, userId: string) {
        const findUser = await this.userRepository.findOne({ where: { id: userId } });
        if (!findUser) throw new HttpException('User Not Found', 400);

        const userWithFollows = await this.findUserWithFollows(userId);
        if (!userWithFollows) throw new HttpException('User Not Found', 400);

        const followedUserIds = userWithFollows.follows.map(followedUser => followedUser.id);

        const posts = await this.postRepository.find({
            where: { createdBy: In(followedUserIds) },
            order: { createdAt: 'DESC' },
            relations: ['createdBy'],
        });

        return posts;
    }
}