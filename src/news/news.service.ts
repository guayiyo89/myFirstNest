import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsSchema } from './schemas/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QueryOptions } from 'src/options/query-options.config';
import { NotFoundError } from 'rxjs';


@Injectable()
export class NewsService {
    constructor(@InjectModel(News.name) private readonly newsModel: Model<News>, private httpSvc: HttpService) { }

    async create(createNewsDto: CreateNewsDto): Promise<News> {
        try{
            return await new this.newsModel({...createNewsDto, createdAt: new Date()}).save();
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async findAll(options: QueryOptions) {
        if(!options.offset){
            options.offset = 0
        }
        const result = await this.newsModel.find().sort({writtenAt: -1}).skip(Number(options.offset)).limit(5).exec();
        return {result, total: result.length};
    }

    async findOne(_id: string): Promise<News>{
        try{
            const news = await this.newsModel.findById(_id).exec()

            if(!news){
                throw new NotFoundException('the article does not exist ' + _id)
            }

            return news
        }
        catch(err){
            throw new BadRequestException(err.message)
        }
    }

    async findByMonth(options: QueryOptions ,month: string): Promise<News[]> {
        if(!options.offset){
            options.offset = 0
        }
        return await this.newsModel.find({month}).sort({writtenAt: -1}).skip(Number(options.offset)).limit(5).exec();
    }

    async findByAuthor(options: QueryOptions ,author: string): Promise<News[]> {
        if(!options.offset){
            options.offset = 0
        }
        return await this.newsModel.find({author}).sort({writtenAt: -1}).skip(Number(options.offset)).limit(5).exec();
    }

    async findByTitle(options: QueryOptions ,title: string): Promise<News[]> {
        if(!options.offset){
            options.offset = 0
        }
        return await this.newsModel.find({title: {$regex: `/${title}/`}}).sort({writtenAt: -1}).skip(Number(options.offset)).limit(5).exec();
    }

    async findByTag(options: QueryOptions ,tag: string): Promise<News[]> {
        if(!options.offset){
            options.offset = 0
        }
        return await this.newsModel.find({tags: tag}).sort({writtenAt: -1}).skip(Number(options.offset)).limit(5).exec();
    }

    async update(_id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
        return await this.newsModel.findByIdAndUpdate(_id, updateNewsDto).exec();
    }

    async delete(_id: string): Promise<News> {
        try{
            const news = await this.newsModel.findById(_id).exec()

            if(!news){
                throw new NotFoundException('the article does not exist ' + _id)
            }

            return await this.newsModel.findByIdAndDelete(_id).exec();
        }
        catch(err){
            throw new BadRequestException(err.message)
        }
    }

    async findByStoryId(story_id: number): Promise<News[]>{
        return await this.newsModel.find({story_id}).exec()
    }

    async fillDb() {
        return await this.fillDatabase()
    }
    
    @Cron(CronExpression.EVERY_HOUR)
    handleCron() {
        const url = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs"
        this.httpSvc.get(url).subscribe(news => {
            let pin = news.data.hits[0]
            let storyId = pin.story_id
            let month = this.getMonth(pin.created_at)

            this.findByStoryId(storyId).then(result => {
                console.log(result.length)
                if(result.length == 0){
                    console.log('a news has been added to database', pin.author);
                    new this.newsModel({
                        title: pin.story_title || 'untitled',
                        description: pin.comment_text,
                        author: pin.author,
                        tags: pin._tags,
                        writtenAt: pin.created_at,
                        month: month,
                        story_id: storyId,
                        createdAt: new Date()
                    }).save()
                }
            })
            
            
        })
    }

    fillDatabase(){
        const url = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs"

        this.httpSvc.get(url).subscribe(news => {
            let pin = news.data.hits

            let arrNews = []
                        
            pin.forEach(article => {
                let month = this.getMonth(article.created_at)
                let titulo = article.story_title 
                console.log(titulo)
                
                arrNews.push({
                    title: titulo || 'untitled',
                    description: article.comment_text,
                    author: article.author,
                    tags: article._tags,
                    writtenAt: article.created_at,
                    month: month,
                    story_id: article.story_id,
                    createdAt: new Date()
                })
                
            });

            this.newsModel.insertMany(arrNews.reverse).then(result => {
                console.log(result)
            })
            console.log('the news has been added to database', pin.length);
        })
    }
    
    getMonth(dateAt:string){
        let month = (dateAt.split('T')[0]).split('-')[1]
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

