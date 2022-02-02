import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule} from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
     HttpModule, NewsModule,
     MongooseModule.forRoot('mongodb+srv://guayin89:C1a4s4a2@cluster0.b7zex.mongodb.net/testDb?retryWrites=true&w=majority'),
     ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
