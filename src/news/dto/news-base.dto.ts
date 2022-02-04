import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class NewsBaseDto {
    @ApiProperty({
        type: String,
        description: "The title of the article"
    })
    title?: string;

    @ApiProperty({
        type: String,
        description: "The summary of the news"
    })
    description?: string;

    @ApiProperty({
        type: String,
        description: "The author of the article"
    })
    author?: string;

    @ApiProperty({
        type: String,
        description: "The Tags attached to the article"
    })
    tags: [{type: string}];

    @ApiProperty({
        type: String,
        description: "The date when the article was written"
    })
    writtenAt: string;

    @ApiProperty({
        type: String,
        description: "The month when the article was written. It is saved for searching by month."
    })
    month?: string;

    @ApiProperty({
        type: Number,
        description: "The unique id of the news in the API"
    })
    story_id: number;
}