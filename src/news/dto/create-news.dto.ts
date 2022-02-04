import { NewsBaseDto } from "./news-base.dto";

export class CreateNewsDto extends NewsBaseDto {
    createdAt: Date;
}