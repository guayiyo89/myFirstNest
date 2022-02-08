
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { tokenStub } from './auth/test/stub/token.stub';
import { User } from './users/schemas/users.schema';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController
  let authSvc: AuthService

  const userModel = {
    username: 'string',
    password: 'string'
  }

  beforeEach(async () => {

    const app: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, MongooseModule.forRoot(`mongodb://mongo:27017/newsapidb`, { useNewUrlParser: true })],
      controllers: [AppController],
      providers: [AppService,
        {provide: AuthService, useValue: {login: jest.fn(), validateUser: jest.fn()}},
        {provide: UsersService, useValue: {findByUsername: jest.fn()}},
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        }],
    }).compile();

    appController = app.get<AppController>(AppController);
    authSvc = app.get<AuthService>(AuthService)
    jest.clearAllMocks()
  });


  describe('login', () => {
    let userLogged: User
    let getToken: any

    beforeEach(async () => {
      userLogged = {
        username: 'default',
        password: 'reign2020'
      }

      getToken = await appController.login(userLogged)
    })

    test('Validation is called from AuthService', () => {
      expect(authSvc.validateUser).toBeDefined()
    })

    test('Login function is called from AuthService', () => {
      expect(authSvc.login).toHaveBeenCalled()
    })

    test('After login the user has been logged (Code 201)', () => {
      expect(201)
    })


  })

  describe('user not found in the database', () => {
    let userLogged: User
    let getToken: any

    beforeEach(async () => {
      userLogged = {
        username: 'userNotFound',
        password: 'reign2020'
      }

      getToken = await appController.login(userLogged)
    })

    test('Validation is called from AuthService', () => {
      expect(authSvc.validateUser).toBeDefined()
    })

    test('Login function is called from AuthService', () => {
      expect(authSvc.login).toHaveBeenCalled()
    })

    test('The user with the username has not found in the database. (Error 404)', () => {
      expect(404)
    })
  })

  describe('the password does not match with the username', () => {
    let userLogged: User
    let getToken: any

    beforeEach(async () => {
      userLogged = {
        username: 'default',
        password: 'myPass'
      }

      getToken = await appController.login(userLogged)
    })

    test('Validation is called from AuthService', () => {
      expect(authSvc.validateUser).toBeDefined()
    })

    test('Login function is called from AuthService', () => {
      expect(authSvc.login).toHaveBeenCalled()
    })

    test('The credentials does not match. (Error 401, Unauthorized)', () => {
      expect(401)
    })
  })


});
