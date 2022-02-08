import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import { News } from './schemas/news.schema';

const mockNews = (title = 'A new article', description = 'It is a new article to be written.',
  author = 'guayo', tags = ['guayo', 'comment', 'news'], writtenAt = "2022-02-04T14:06:18.000Z", month = 'February', story_id = 12345678): News => ({
  title, description, author, tags, writtenAt, month, story_id 
})

describe('NewsService', () => {
  let service: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [NewsService, {
        provide: getModelToken(News.name),
        useValue: {
          new: jest.fn().mockResolvedValue(mockNews()),
          findById: jest.fn().mockResolvedValue(mockNews()),
          findAll: jest.fn().mockResolvedValue([mockNews()])
        }
      }],
    }).compile();

    service = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
