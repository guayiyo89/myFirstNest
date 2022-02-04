import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authSvc: AuthService) {}

  @Get()
  getHello(){
    return this.appService.getNewsFromApi();
  }

  @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authSvc.login(req.user);
    }
  
}
