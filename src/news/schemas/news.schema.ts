import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NewsDocument = News & Document;

@Schema()
export class News {
    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop()
    updatedAt?: Date;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    deletedAt?: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News)