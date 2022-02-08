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
     MongooseModule.forRoot( `mongodb://mongo:27017`, {dbName: 'newsapidb'}),
     ScheduleModule.forRoot(),
     AuthModule,
     UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
