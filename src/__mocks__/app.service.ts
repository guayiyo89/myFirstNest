export const AuthService = jest.fn().mockReturnValue({
    getHello: jest.fn().mockReturnValue('Hello World!')
})