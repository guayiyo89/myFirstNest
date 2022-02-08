import { UserBaseDto } from "./user-base.dto";

export class CreateUserDto extends UserBaseDto {
    createdAt?: Date;
}
