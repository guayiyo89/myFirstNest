import { Controller, Body, Get, Post, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async index(){
        return await this.newsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async find(@Param('id') _id:string){
        return await this.newsService.findOne(_id);
    }

    @Post()
    async create(@Body() createNewsDto: CreateNewsDto){
        return await this.newsService.create(createNewsDto);
    }

    @Put(':id')
    async update(@Param('id') _id:string, @Body() updateNewsDto: UpdateNewsDto){
        return await this.newsService.update(_id, updateNewsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id:string){
        return await this.newsService.delete(id);
    }
}
