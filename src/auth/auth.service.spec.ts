import { JwtModule } from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/schemas/users.schema';
import { jwtSeed } from '../config';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const userModel = {
    username: 'string',
    password: 'string'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, 
        MongooseModule.forRoot('mongodb+srv://guayin89:C1a4s4a2@cluster0.b7zex.mongodb.net/testDb?retryWrites=true&w=majority'),
        JwtModule.register({
        secret: jwtSeed.secret,
        signOptions: { expiresIn: '1800s' },
        })
      ],
      providers: [AuthService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
