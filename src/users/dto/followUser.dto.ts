import { IsNotEmpty, IsString } from "class-validator";

export class FollowUserDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
    @IsNotEmpty()
    @IsString()
    followId: string;
}