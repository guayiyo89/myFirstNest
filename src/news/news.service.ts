import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsSchema } from './schemas/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QueryOptions } from 'src/options/query-options.config';


@Injectable()
export class NewsService {
    constructor(@InjectModel(News.name) private readonly newsModel: Model<News>, private httpSvc: HttpService) { }

    async create(createNewsDto: CreateNewsDto): Promise<News> {
        return await new this.newsModel({...createNewsDto, createdAt: new Date()}).save();
    }

    async findAll(options: QueryOptions) {
        const result = await this.newsModel.find().skip(Number(options.offset)).limit(5).exec();
        return {result, total: result.length};
    }

    async findOne(_id: string): Promise<News> {
        return await this.newsModel.findById(_id).exec();
    }

    async findByMonth(options: QueryOptions ,month: string): Promise<News[]> {
        return await this.newsModel.find({month}).skip(Number(options.offset)).limit(5).exec();
    }

    async findByAuthor(options: QueryOptions ,author: string): Promise<News[]> {
        return await this.newsModel.find({author}).skip(Number(options.offset)).limit(5).exec();
    }

    async update(_id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
        return await this.newsModel.findByIdAndUpdate(_id, updateNewsDto).exec();
    }

    async delete(_id: string): Promise<News> {
        return await this.newsModel.findByIdAndDelete(_id).exec();
    }
    
    @Cron(CronExpression.EVERY_HOUR)
    handleCron() {
        const url = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs"
        this.httpSvc.get(url).subscribe(news => {
            let pin = news.data.hits[0]
            let month = this.getMonth(pin.created_at)
            console.log('a news has been added to database', pin.author);
            new this.newsModel({
                title: pin._highlightResult.story_title.value,
                description: pin.comment_text,
                author: pin.author,
                tags: pin._tags,
                writtenAt: pin.created_at,
                month: month,
                createdAt: new Date()
            }).save()
        })
    }

    getMonth(dateAt:string){
        let month = (dateAt.split('T')[0]).split('-')[1]
        console.log(month)
        let mes = ''
        switch (month){
            case '01':
                mes = 'January'
                break
            case '02':
                mes = 'February'
                break
            case '03':
                mes = 'March'
                break
            case '04':
                mes = 'April'
                break
            case '05':
                mes = 'May'
                break
            case '06':
                mes = 'June'
                break
            case '07':
                mes = 'July'
                break
            case '08':
                mes = 'August'
                break
            case '09':
                mes = 'September'
                break
            case '10':
                mes = 'October'
                break
            case '11': 
                mes = 'November'
                break
            case '12':
                mes = 'December'
                break
        }

        return mes
    }

}

// new this.newsModel({
//     title: news.data.hits[0].story_title.value,
//     description: news.data.hits[0].comment_text,
//     author: news.data.hits[0].author,
//     story_url: news.data.hits[0].story_url,
//     createdAt: new Date()
// }).save()
