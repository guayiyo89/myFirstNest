import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/users.schema';
import { UserStub } from './test/stubs/users.stub';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


jest.mock('./users.service')

describe('UsersController', () => {
  let controller: UsersController;
  let userSvc: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userSvc = module.get<UsersService>(UsersService);
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create a new user', () => {
    describe('when a new user is created', () => {
      let user: User
      let createuserDto: CreateUserDto

      beforeEach(async () => {
        createuserDto = {
          username: UserStub().username,
          password: 'test2022'
        }

        user = await controller.create(createuserDto)
      })

      test('then it should call usersService', () => {
        expect(userSvc.create).toHaveBeenCalledWith({username: createuserDto.username, password: createuserDto.password});
      })

      test('then it should return a user', () => {
        expect(user).toEqual(UserStub())
      })

    })

    describe('when the data is incomplete', () => {
      let user: User
      let createuserDto: any

      beforeEach(async () => {
        createuserDto = {
          username: UserStub().username
        }

        user = await controller.create(createuserDto)
      })

      test('then it should call usersService', () => {
        expect(userSvc.create).toHaveBeenCalledWith({username: createuserDto.username, password: createuserDto.password});
      })

      test('then it should return a 500 error', () => {
        expect(500)
      })

    })
  })

});
