import { Module } from "@nestjs/common";
import { Users } from "src/schemas/user.schema";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    providers: [ UsersService ],
    controllers: [UsersController]

})
export class UsersModule {
    
}