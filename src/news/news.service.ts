import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsSchema } from './schemas/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/create-news.dto copy';

@Injectable()
export class NewsService {
    constructor(@InjectModel(News.name) private readonly newsModel: Model<News>) { }

    async create(createNewsDto: CreateNewsDto): Promise<News> {
        return await new this.newsModel({...createNewsDto, createdAt: new Date()}).save();
    }

    async findAll(): Promise<News[]> {
        return await this.newsModel.find().exec();
    }

    async findOne(id: string): Promise<News> {
        return await this.newsModel.findById(id).exec();
    }

    async update(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
        return await this.newsModel.findByIdAndUpdate(id, updateNewsDto).exec();
    }

    async delete(id: string): Promise<News> {
        return await this.newsModel.findByIdAndDelete(id).exec();
    }
}
