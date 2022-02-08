import { News } from "src/news/schemas/news.schema";

export const newsStub = (): News => {
    return {
        title: 'Guayo ha terinado su aplicacion en NestJS',
        description: 'Hace dos dias Guayo comenzo a programar una aplicacion desarrollada en NestJS...',
        author: 'guayo',
        tags: ['Node', 'Guayo'],
        writtenAt: "2022-02-05T21:39:57.000Z",
        month: "February",
        story_id: 76585231
    }
}