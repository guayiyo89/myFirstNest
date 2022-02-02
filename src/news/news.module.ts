import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News, NewsSchema } from './schemas/news.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }])],
})
export class NewsModule {}
