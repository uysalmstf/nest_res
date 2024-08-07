import { Body, Controller, Get, HttpException, Param, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import mongoose from "mongoose";
import { FollowUserDto } from "./dto/followUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("users")
export class UsersController {

    constructor(private usersService: UsersService){}
    
    @Post("login")
    async loginUser(@Body() loginUserDto: LoginUserDto) {

        return await this.usersService.loginUser(loginUserDto);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {

        const user = await this.usersService.createUser(createUserDto);
        return true;    
    }

    @UseGuards(AuthGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    @Get(":username")
    async getUserByUsername(@Param('username') username: string) {
        return await this.usersService.getUserByUsername(username);
    }
    @UseGuards(AuthGuard)
    @Post("follow")
    async followUser(@Body() followUserDto: FollowUserDto) {
        return await this.usersService.followUser(followUserDto);
    }
}