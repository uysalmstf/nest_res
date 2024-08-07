import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Users } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/createUser.dto";
import { FollowUserDto } from "./dto/followUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private userModel: Model<Users>,
        private jwtService: JwtService
    ) {}

    async loginUser(loginUserDto: LoginUserDto) {
        
        const {username, password} = loginUserDto
        
        const user = await this.userModel.findOne({username});
        if (!user) {
            
            throw new HttpException("User Not Found", 400);
        }

        console.log(user)
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            
            throw new HttpException("User Pass Does not match", 400);
        }

        return this.generateUserToken(user);
    }

    async generateUserToken(user) {
        const accessToken = this.jwtService.sign({user}, {expiresIn: '1h'});

        return accessToken;

    }

    async createUser(createUserDto: CreateUserDto) {
        const {username, password} = createUserDto;
        const usernameInUse = await this.userModel.findOne({username});
        if (usernameInUse) {
            throw new HttpException("Username In Use", 400);
        }

        const hashedPass = await bcrypt.hash(password, 10);

        await this.userModel.create({
            username,
            password: hashedPass
        });

        return true;
    }


    async followUser(followUserDto: FollowUserDto, userId: string) {
        const myInfo = await this.userModel.findById(userId);
        if (!myInfo) {
            throw new HttpException("My Info Not Found", 400);
        }

        const followUserInfo = await this.userModel.findById(followUserDto.followId);
        if (!followUserInfo) {
            throw new HttpException("Followed User Info Not Found", 400);
        }


        const myInfoResult = await this.userModel.updateOne({_id: myInfo._id}, {
            $push: {
              follows: followUserInfo,
            },
          });

          return myInfoResult;
    }
}