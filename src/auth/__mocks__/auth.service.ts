import { tokenStub } from "../test/stub/token.stub";

export const AuthService = jest.fn().mockReturnValue({
    validateUser: jest.fn().mockResolvedValue({username: 'default'}),
    login: jest.fn().mockResolvedValue(tokenStub)
})