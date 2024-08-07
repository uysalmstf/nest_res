import { IsNotEmpty, IsString } from "class-validator";

export class FollowUserDto {
    @IsNotEmpty()
    @IsString()
    followId: string;
}