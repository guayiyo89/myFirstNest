import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Get()
    async index(){
        return await this.newsService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id:string){
        return await this.newsService.findOne(id);
    }

    @Post()
    async create(@Body() createNewsDto: CreateNewsDto){
        return await this.newsService.create(createNewsDto);
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() updateNewsDto: UpdateNewsDto){
        return await this.newsService.update(id, updateNewsDto);
    }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return await this.newsService.delete(id);
    }
}
