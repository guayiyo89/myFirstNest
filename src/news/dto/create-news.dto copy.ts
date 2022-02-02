import { NewsBaseDto } from "./news-base.dto";

export class UpdateNewsDto extends NewsBaseDto {
    updatedAt?: Date;
}