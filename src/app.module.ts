import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule} from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
     HttpModule, NewsModule,
     MongooseModule.forRoot(`mongodb://localhost:27017/newsapidb`, { useNewUrlParser: true }),
     ScheduleModule.forRoot(),
     AuthModule,
     UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
