import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger/dist/decorators';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UserBaseDto } from './users/dto/user-base.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authSvc: AuthService) {}

  @Get()
  getHello(){
    return this.appService.getNewsFromApi();
  }

  @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiBody({type: UserBaseDto})
    @ApiOperation({ summary: 'Get a news by its Id'})
    @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
    @ApiBadRequestResponse({status: 400, description: 'Please insert a valid value for _id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @ApiResponse({ status: 200, description: 'Return a token'})
    async login(@Request() req) {
        return this.authSvc.login(req.user);
    }
  
}
