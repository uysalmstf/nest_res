import { Body, Controller, Get, HttpException, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import mongoose from "mongoose";
import { FollowUserDto } from "./dto/followUser.dto";

@Controller("users")
export class UsersController {

    constructor(private usersService: UsersService){}
    
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {

       return this.usersService.createUser(createUserDto);
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(":id")
    async getUserById(@Param('id') id: string) {

        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new HttpException("User ID Not Valid", 400);
       } 

        const findUser = await this.usersService.getUserById(id);
        if (!findUser) {
             throw new HttpException("User Not Found", 400);
        } 

        return findUser;
    }

    @Get(":username")
    async getUserByUsername(@Param('username') username: string) {
        return await this.usersService.getUserByUsername(username);
    }

    @Post("follow")
    async followUser(@Body() followUserDto: FollowUserDto) {
        return await this.usersService.followUser(followUserDto);
    }
}