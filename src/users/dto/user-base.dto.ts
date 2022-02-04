import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class UserBaseDto {
    @ApiProperty({
        type: String,
        description: "The name of the user"
    })
    username: string;

    @ApiProperty({
        type: String,
        description: "The password of the user. It's encrypted when is saved into database"
    })
    password: string;
}