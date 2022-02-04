import { Controller, Body, Get, Post, Put, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async index(@Req() req){
        return await this.newsService.findAll(req.query);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async find(@Param('id') _id:string){
        return await this.newsService.findOne(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/month/:month')
    async findByMonth(@Req() req, @Param('month') month:string){
        return await this.newsService.findByMonth(req.query, month);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/byAuthor/:author')
    async findByAuthor(@Req() req, @Param('author') author:string){
        return await this.newsService.findByAuthor(req.query, author);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/tag/:tag')
    async findByTag(@Req() req, @Param('tag') tag:string){
        return await this.newsService.findByTag(req.query, tag);
    }

    @Get('/byStoryId/:story_id')
    async findByStoryId(@Param('story_id') story_id: number){
        return await this.newsService.findByStoryId(story_id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id:string){
        return await this.newsService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('fill')
    async fillNews(){
        return await this.newsService.fillDatabase()
    }
}
