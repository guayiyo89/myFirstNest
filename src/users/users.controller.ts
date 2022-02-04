import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'List of users stored in database' })
  @ApiResponse({ status: 200, description: 'Return a list of users', type: [CreateUserDto] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return an user by his Id' })
  @ApiResponse({ status: 200, description: 'Return an user by his Id', type: [CreateUserDto] })
  @ApiResponse({ status: 404, description: "The Id doesn't match with any result", type: [CreateUserDto] })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('name/:username')
  @ApiOperation({ summary: 'Return an user by his Username' })
  @ApiResponse({ status: 200, description: 'Return an user by his Username', type: [CreateUserDto] })
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
  @ApiResponse({ status: 200, description: 'User has been deleted', type: [CreateUserDto] })
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
