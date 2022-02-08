import { newsStub } from "../test/stubs/news.stub";

export const NewsService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(newsStub()),
    findAll: jest.fn().mockResolvedValue([newsStub()]), 
    findByMonth: jest.fn().mockResolvedValue([newsStub()]),
    findByAuthor: jest.fn().mockResolvedValue([newsStub()]),
    findByTitle: jest.fn().mockResolvedValue([newsStub()]),
    findByTag: jest.fn().mockResolvedValue([newsStub()]),
})