import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Posts } from "./posts.schema";
import mongoose from "mongoose";

@Schema()
export class Users{

    @Prop({unique: true, required: true})
    username: string;

    @Prop()
    password: string;
    
    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}] })
    posts: Posts[];

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}] })
    follows: Users[];
}

export const UserSchema = SchemaFactory.createForClass(Users);