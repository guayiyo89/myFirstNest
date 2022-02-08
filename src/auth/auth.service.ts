import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userSvc: UsersService, private jwtSvc: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userSvc.findByUsername(username);
        const isMatch = await bcrypt.compare(pass, user.password)

        if(user === null){
            throw new UnauthorizedException()
        }

        if (user && isMatch) {
            const { password, ...result } = user;
            return result;
        }

        return null

    }

    async login(user: any) {
        const payload = {username: user.username, sub: user._id}

        return {
            access_token: this.jwtSvc.sign(payload)
        }
    }
}
