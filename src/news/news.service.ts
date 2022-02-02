import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsSchema } from './schemas/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/create-news.dto copy';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';


@Injectable()
export class NewsService {
    constructor(@InjectModel(News.name) private readonly newsModel: Model<News>, private httpSvc: HttpService) { }

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
    
    @Cron('10 * * * * *')
    handleCron() {
        const url = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs"
        this.httpSvc.get(url).subscribe(news => {
            let pin = news.data.hits[0]
            console.log('a news has been added to database', pin.author);
            new this.newsModel({
                title: pin._highlightResult.story_title.value,
                description: pin.comment_text,
                author: pin.author,
                story_url: pin.story_url,
                createdAt: new Date()
            }).save()
        })
    }

}

// new this.newsModel({
//     title: news.data.hits[0].story_title.value,
//     description: news.data.hits[0].comment_text,
//     author: news.data.hits[0].author,
//     story_url: news.data.hits[0].story_url,
//     createdAt: new Date()
// }).save()
