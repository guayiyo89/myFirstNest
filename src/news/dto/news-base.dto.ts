export class NewsBaseDto {
    title?: string;
    description?: string;
    author?: string;
    tags: [{type: string}];
    writtenAt: string;
    month?: string;
}