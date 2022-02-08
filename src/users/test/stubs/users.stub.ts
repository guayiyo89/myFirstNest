import { User } from "src/users/schemas/users.schema";
import * as bcrypt from 'bcrypt';

export const UserStub = (): User => {
    const hash = bcrypt.hash('test2022', 10);
    return {
        username: 'guayiyo89',
        password: hash.toString(),
    }
}