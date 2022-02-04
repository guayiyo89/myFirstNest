import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News, NewsSchema } from './schemas/news.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]), HttpModule],
})
export class NewsModule {}
