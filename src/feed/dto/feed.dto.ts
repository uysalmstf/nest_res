import { IsNotEmpty, IsString } from "class-validator";

export class FeedDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
}