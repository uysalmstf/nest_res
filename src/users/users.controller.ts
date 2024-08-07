import { Body, Controller, Get, HttpException, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import mongoose from "mongoose";
import { FollowUserDto } from "./dto/followUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { endWith } from "rxjs";

@Controller("users")
export class UsersController {

    constructor(private usersService: UsersService){}
    
    @Post("login")
    async loginUser(@Body() loginUserDto: LoginUserDto) {

        console.log(loginUserDto)
        return await this.usersService.loginUser(loginUserDto);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {

        const user = await this.usersService.createUser(createUserDto);
        return true;    
    }

   
    @UseGuards(AuthGuard)
    @Post("follow")
    async followUser(@Body() followUserDto: FollowUserDto, @Req() req) {
        return await this.usersService.followUser(followUserDto, req.user._id);
    }
}