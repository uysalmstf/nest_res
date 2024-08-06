import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Users } from "./user.schema";

@Schema()
export class Posts{

    @Prop({required: true})
    content: string;

    @Prop({default: Date.now})
    createdAt: Date;

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}] })
    createdBy: Users;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
