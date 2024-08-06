import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Posts{

    @Prop({required: true})
    content: string;

    @Prop({default: Date.now})
    createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
