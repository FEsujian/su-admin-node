import { Injectable } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async getHello(): Promise<any> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello World!');
      }, 1500);
    });
  }

  async signJwt(user, loginDto: LoginDto) {
    const payload = {
      id: user.id,
      username: loginDto.username,
      role: '我是角色',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
