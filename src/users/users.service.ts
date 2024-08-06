import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/createUser.dto";
import { FollowUserDto } from "./dto/followUser.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private userModel: Model<Users>
    ) {}

    createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);

        return newUser.save();
    }

    getAllUsers() {
        return this.userModel.find();
    }

    getUserById(id: string) {
        return this.userModel.findById(id) ?? null;
    }

    getUserByUsername(username: string) {
        return this.userModel.findOne({username: username});
    }

    async followUser(followUserDto: FollowUserDto) {
        const myInfo = await this.userModel.findById(followUserDto.userId);
        if (!myInfo) {
            throw new HttpException("My Info Not Found", 400);
        }

        const followUserInfo = await this.userModel.findById(followUserDto.followId);
        if (!followUserInfo) {
            throw new HttpException("Followed User Info Not Found", 400);
        }

        /*const amIfollowing = await this.userModel.find({follows: followUserInfo._id, _id: followUserDto.userId });
        if (amIfollowing) {
            throw new HttpException("Still Following", 400);
        }*/

        const myInfoResult = await this.userModel.updateOne({_id: myInfo._id}, {
            $push: {
              follows: followUserInfo,
            },
          });

          return myInfoResult;
    }
}