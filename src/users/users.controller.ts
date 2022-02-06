import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserBaseDto } from './dto/user-base.dto';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse,
   ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new user to the database' })
  @ApiBody({type: CreateUserDto, description: 'The mock of the user to be inserted into database.'})
  @ApiResponse({ status: 201, description: 'Create a new user and shows the user added', type: UserBaseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
  @ApiBadRequestResponse({status: 400, description: 'Please insert a valid value for _id'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'List of users stored in database' })
  @ApiOkResponse({ status: 200, description: 'Return a list of users', type: [UserBaseDto] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return an user by his Id' })
  @ApiOkResponse({ status: 200, description: 'Return an user by his Id', type: UserBaseDto })
  @ApiNotFoundResponse({ status: 404, description: "The Id doesn't match with any result"})
  @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
  @ApiBadRequestResponse({status: 400, description: 'Please insert a valid value for _id'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('name/:username')
  @ApiOperation({ summary: 'Return an user by his Username' })
  @ApiOkResponse({ status: 200, description: 'Return an user by his Username', type: UserBaseDto })
  @ApiNotFoundResponse({ status: 404, description: "The Username doesn't match with any result"})
  @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
  findByName(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update an user by his Id' })
  // @ApiResponse({ status: 200, description: 'Update has been updated', type: [CreateUserDto] })
  // @ApiResponse({ status: 500, description: 'Internal Server Error, please insert again the requested information and a valid Id'})
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an user from the DB by his Id' })
  @ApiResponse({ status: 200, description: 'User has been deleted', type: UserBaseDto })
  @ApiNotFoundResponse({ status: 404, description: "The Id doesn't match with any result"})
  @ApiInternalServerErrorResponse({ description: 'Internal server error',  })
  @ApiBadRequestResponse({status: 400, description: 'Please insert a valid value for _id'})
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
