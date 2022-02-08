import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/schemas/users.schema';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News } from './schemas/news.schema';
import { newsStub } from './test/stubs/news.stub';

jest.mock('./news.service')

describe('NewsController', () => {
  let controller: NewsController;
  let newsSvc: NewsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [NewsController],
      providers: [NewsService]
    }).overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: (context: ExecutionContext) =>{
        const req = context.switchToHttp().getRequest();
        req.user = User;
        return true;
      }
    })
    .compile();

    controller = module.get<NewsController>(NewsController);
    newsSvc = module.get<NewsService>(NewsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNews', () => {
    describe('when getNews is called and bring data', () => {
      let news: News
      beforeEach(async () => {
        news = await controller.find('61fee550262d47e0b498740e')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findOne).toHaveBeenCalled()
      })

      test('then it should return news', () => {
        expect(news).toEqual(newsStub())
      })
    })

    describe('when the path _id does not match any result', () => {
      let news: News
      beforeEach(async () => {
        news = await controller.find('61fee550262d47e0b4987407')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findOne).toHaveBeenCalled()
      })

      test('then it should return news', () => {
        expect(404)
      })
    })

    describe('when the path _id is corrupted', () => {
      let news: News
      beforeEach(async () => {
        news = await controller.find('61fee5502')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findOne).toHaveBeenCalled()
      })

      test('then it should return news', () => {
        expect(400)
      })
    })
  })

  describe('getNewsList', () => {
    describe('when index is called and bring data', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.index('')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findAll).toHaveBeenCalled()
      })

      test('then it should return news', () => {
        expect(news).toEqual([newsStub()])
      })

    })
  })

  describe('get News by the name of the month', () => {
    describe('when findByMonth is called and bring data', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByMonth('', 'February')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByMonth).toHaveBeenCalled()
      })

      test('then it should return news', () => {
        expect(news).toEqual([newsStub()])
      })

    })

    describe('when the month does not have any result', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByMonth('', 'July')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByMonth).toHaveBeenCalled()
      })

      test('then it should return a Not Found Error', () => {
        expect(404)
      })
    })

    describe('when the user does not pass any month to the path', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByMonth('', '')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByMonth).toHaveBeenCalled()
      })

      test('then it should return a Bad Request Error', () => {
        expect(400)
      })
    })

  })

  describe('get News by the name of its author', () => {
    describe('when findByAuthor is called', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByAuthor('', 'redbar0n')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByAuthor).toHaveBeenCalled()
      })

      test('then it should return news', () => {
        expect(news).toEqual([newsStub()])
      })
    })

    describe('when the author does not have any result', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByAuthor('', 'tommy_lee69')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByAuthor).toHaveBeenCalled()
      })

      test('then it should return a Not Found Error', () => {
        expect(404)
      })
    })

    describe('when the user does not pass any author to the path', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByAuthor('', '')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByAuthor).toHaveBeenCalled()
      })

      test('then it should return a Bad Request Error', () => {
        expect(400)
      })
    })
  })

  describe('get News by a word (or words) that appears in the title', () => {
    describe('when findByTitle is called', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByTitle('', 'node')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByTitle).toHaveBeenCalled()
      })

      test('then it should return news', () => {
        expect(news).toEqual([newsStub()])
      })
    })

    describe('when the word or prhase does not match any result', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByTitle('', 'recu435dro')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByTitle).toHaveBeenCalled()
      })

      test('then it should return a Not Found Error', () => {
        expect(404)
      })
    })

    describe('when the user does not pass any word or phrase to the path', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByTitle('', '')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByTitle).toHaveBeenCalled()
      })

      test('then it should return a Bad Request Error', () => {
        expect(400)
      })
    })
  })

  describe('get News by a tag', () => {
    describe('when findByTag is called and bring a result', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByTag('', 'comment')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByTag).toHaveBeenCalled()
      })

      test('then it should return news', () => {
        expect(news).toEqual([newsStub()])
      })
    })

    describe('when the tag does not match any result', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByTag('', 'ososP4nda5')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByTag).toHaveBeenCalled()
      })

      test('then it should return a Not Found Error', () => {
        expect(404)
      })
    })

    describe('when the user does not pass any tag to the path', () => {
      let news: News[]
      beforeEach(async () => {
        news = await controller.findByTag('', '')
      })

      test('then it should call newsService', () => {
        expect(newsSvc.findByTag).toHaveBeenCalled()
      })

      test('then it should return a Bad Request Error', () => {
        expect(400)
      })
    })
  })


});


