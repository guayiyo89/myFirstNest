import { Controller, Body, Get, Post, Put, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsBaseDto } from './dto/news-base.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';

@ApiBearerAuth('JWT')
@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'List of news stored in database' })
    @ApiOkResponse({ status: 200, description: 'Return a list of news', type: [NewsBaseDto] })
    @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
    @ApiUnauthorizedResponse({description: 'Unauthorized. Require a valid token'})
    async index(@Req() req){
        return await this.newsService.findAll(req.query);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get a news by its Id' })
    @ApiOkResponse({ status: 200, description: 'Return a news', type: NewsBaseDto })
    @ApiNotFoundResponse({ status: 404, description: "The Id doesn't match with any result"})
    @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
    @ApiBadRequestResponse({status: 400, description: 'Please insert a valid value for _id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized. Require a valid token'})
    async find(@Param('id') _id:string){
        return await this.newsService.findOne(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/month/:month')
    @ApiOperation({ summary: 'Shows a list of news of a determined month' })
    @ApiOkResponse({ status: 200, description: 'Return a list of news', type: [NewsBaseDto] })
    @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
    @ApiBadRequestResponse({status: 400, description: 'Please insert a valid value.'})
    @ApiUnauthorizedResponse({description: 'Unauthorized. Require a valid token'})
    async findByMonth(@Req() req, @Param('month') month:string){
        return await this.newsService.findByMonth(req.query, month);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/byAuthor/:author')
    @ApiOperation({ summary: 'Shows a list of news written by a determined author' })
    @ApiOkResponse({ status: 200, description: 'Return a list of news', type: [NewsBaseDto] })
    @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
    @ApiBadRequestResponse({status: 400, description: 'Please insert a valid value.'})
    @ApiUnauthorizedResponse({description: 'Unauthorized. Require a valid token'})
    async findByAuthor(@Req() req, @Param('author') author:string){
        return await this.newsService.findByAuthor(req.query, author);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/tag/:tag')
    @ApiOperation({ summary: 'Shows a list of news which have the tag' })
    @ApiOkResponse({ status: 200, description: 'Return a list of news', type: [NewsBaseDto] })
    @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
    @ApiBadRequestResponse({status: 400, description: 'Please insert a valid value.'})
    @ApiUnauthorizedResponse({description: 'Unauthorized. Require a valid token'})
    async findByTag(@Req() req, @Param('tag') tag:string){
        return await this.newsService.findByTag(req.query, tag);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/title/:title')
    @ApiOperation({ summary: 'Shows a list of news which match with the word in their title.' })
    @ApiOkResponse({ status: 200, description: 'Return a list of news', type: [NewsBaseDto] })
    @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
    @ApiBadRequestResponse({status: 400, description: 'Please insert a valid value.'})
    @ApiUnauthorizedResponse({description: 'Unauthorized. Require a valid token'})
    async findByTitle(@Req() req, @Param('title') title:string){
        return await this.newsService.findByTitle(req.query, title);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a News from database' })
    @ApiResponse({ status: 200, description: 'The news has been deleted', type: NewsBaseDto })
    @ApiNotFoundResponse({ status: 404, description: "The Id doesn't match with any result"})
    @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
    @ApiBadRequestResponse({status: 400, description: 'Please insert a valid value for _id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized. Require a valid token'})
    async delete(@Param('id') id:string){
        return await this.newsService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('fill')
    @ApiOperation({ summary: 'Fill the DB with the latest news from HackerNews' })
    @ApiResponse({ status: 200, description: 'Return a list of news', type: [NewsBaseDto] })
    @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
    @ApiUnauthorizedResponse({description: 'Unauthorized. Require a valid token'})
    async fillNews(){
        return await this.newsService.fillDatabase()
    }
}
