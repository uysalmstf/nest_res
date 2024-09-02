import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { FollowUserDto } from "./dto/followUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Users } from "../schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private jwtService: JwtService
    ) {}

    async loginUser(loginUserDto: LoginUserDto) {
        try {
            const { username, password } = loginUserDto;
        
            const user = await this.userRepository.findOne({ where: { username } });
            if (!user) {
                throw new HttpException("User Not Found", 400);
            }

            const passMatch = await bcrypt.compare(password, user.password);
            if (!passMatch) {
                throw new HttpException("User Pass Does not match", 400);
            }

            return this.generateUserToken(user);
        } catch (error) {
            console.log(error);
            throw new HttpException("Hata", 500);
        }
    }

    async generateUserToken(user: Users) {
        const accessToken = this.jwtService.sign({ id: user.id, username: user.username }, { expiresIn: '1h' });

        return accessToken;
    }

    async createUser(createUserDto: CreateUserDto) {
        try {
            const { username, password } = createUserDto;
            const usernameInUse = await this.userRepository.findOne({ where: { username } });
            if (usernameInUse) {
                throw new HttpException("Username In Use", 400);
            }

            const hashedPass = await bcrypt.hash(password, 10);

            const newUser = this.userRepository.create({
                username,
                password: hashedPass
            });

            await this.userRepository.save(newUser);

            return true;
        } catch (error) {
            console.log(error);
            throw new HttpException("Hata", 500);
        }
    }

    async followUser(followUserDto: FollowUserDto, userId: string) {
        const myInfo = await this.userRepository.findOne({ where: { id: userId }, relations: ["follows"] });
        if (!myInfo) {
            throw new HttpException("My Info Not Found", 400);
        }

        const followUserInfo = await this.userRepository.findOne({ where: { id: followUserDto.followId } });
        if (!followUserInfo) {
            throw new HttpException("Followed User Info Not Found", 400);
        }

        myInfo.follows.push(followUserInfo);
        const myInfoResult = await this.userRepository.save(myInfo);

        return myInfoResult;
    }
}