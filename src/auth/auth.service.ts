import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userSvc: UsersService, private jwtSvc: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userSvc.findByUsername(username);

        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }

        return null;

    }

    async login(user: any) {
        const payload = {username: user.username, sub: user._id}

        return {
            access_token: this.jwtSvc.sign(payload)
        }
    }
}
