import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [NewsModule, MongooseModule.forRoot('mongodb+srv://guayin89:C1a4s4a2@cluster0.b7zex.mongodb.net/testDb?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
