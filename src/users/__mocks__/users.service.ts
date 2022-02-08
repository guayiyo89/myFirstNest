import { UserStub } from "../test/stubs/users.stub";

export const UsersService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(UserStub()),
    findByUsername: jest.fn().mockResolvedValue(UserStub())
})