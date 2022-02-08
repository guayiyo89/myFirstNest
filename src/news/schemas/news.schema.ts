import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NewsDocument = News & Document;

@Schema()
export class News {
    @Prop()
    title: string;

    @Prop()
    description?: string;

    @Prop()
    author: string;

    @Prop([String])
    tags: string[];

    @Prop()
    writtenAt: string;

    @Prop()
    month: string;

    @Prop()
    story_id: number;

    @Prop()
    updatedAt?: Date;

    @Prop()
    createdAt?: Date;

    @Prop()
    deletedAt?: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News)