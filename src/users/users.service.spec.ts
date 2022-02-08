import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

const mockUser = (username = 'hocico85', password = 'solsolsol'): User => ({
                                                                    username, password
                                                                  })
describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            findByName: jest.fn().mockResolvedValue(mockUser())
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

//   afterEach(() => jest.clearAllMocks())

//   it('should insert a new user', async () => {
//     jest.spyOn(model, 'create').mockImplementationOnce(() =>
//       Promise.resolve({
//         username: 'Oliver',
//         password: 'oliver2892'
//       }),
//     );
//     const newUser = await service.create({
//       username: 'Oliver',
//       password: 'oliver2892'
//     });
//     expect(newUser).toEqual(mockUser('Oliver', 'oliver892'));
//   });
});
