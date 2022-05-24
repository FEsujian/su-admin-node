import { NoAuth } from './../../common/decorator/noAuth.decorator';
import {
  Controller,
  Get,
  Post,
  Logger,
  Req,
  Ip,
  Body,
  HttpCode,
  HttpException,
  Headers,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiParam, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
@ApiTags('Auth 身份认证相关接口')
export class AuthController {
  private logger: Logger = new Logger();
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @NoAuth()
  @ApiBody({
    description: '登录',
    type: LoginDto,
  })
  @ApiOperation({ summary: '登录' })
  Login(
    @Req() request: Request,
    @Ip() ip,
    @Headers() headers,
    @Body() body: LoginDto,
  ): any {
    return this.authService.signJwt(body.username, {
      username: body.username,
      password: body.password,
    });
  }
}
