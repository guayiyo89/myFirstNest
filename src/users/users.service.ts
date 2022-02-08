import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try{
      const usernameDB = await this.userModel.findOne({username: createUserDto.username}).exec()

      if(!createUserDto.password || !createUserDto.username){
        throw new InternalServerErrorException('the password and username are required')
      }
      if(usernameDB){
        throw new BadRequestException('This username exist in the database. Please choose another.')
      }

      const password = createUserDto.password;
      const hash = await bcrypt.hash(password, 10);
      createUserDto.password = hash
      return await new this.userModel({...createUserDto, createdAt: new Date()}).save();
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(_id: string){
    try{
      const user = await this.userModel.findById(_id).exec();

      if(!user){
        throw new NotFoundException({statusCode: 404, message: 'the user does not exist ' + _id})
      }

      return user
    } 
    catch(err){
      throw new BadRequestException(err.message)
    }
  }

  async findByUsername(username: string): Promise<User> {
    try{
      const user = await this.userModel.findOne({username}).exec();

      if(!user){
        throw new NotFoundException({statusCode: 404, message: 'the user does not exist ' + username})
      }

      return user
    } 
    catch(err){
      throw new BadRequestException(err.message)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async delete(_id: string): Promise<User> {
    try{
      const user = await this.userModel.findById(_id).exec();

      if(!user){
        throw new NotFoundException({statusCode: 404, message: 'the user does not exist: ' + _id})
      }

      return await this.userModel.findByIdAndDelete(_id).exec();
    } 
    catch(err){
      throw new BadRequestException(err.message)
    }
  }

}
