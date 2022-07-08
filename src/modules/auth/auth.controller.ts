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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiExtension,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
@ApiTags('身份认证相关接口')
export class AuthController {
  private logger: Logger = new Logger();
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @NoAuth()
  @ApiBody({
    description: '登录',
    type: [LoginDto],
  })
  @ApiOperation({ summary: '登录' })
  Login(
    @Req() request: Request,
    @Ip() ip,
    @Headers() headers,
    @Body() body: LoginDto,
  ): any {
    return this.authService.login(body);
  }

  @Get('captcha')
  @NoAuth()
  @ApiOperation({ summary: '获取验证码' })
  Captcha(): any {
    return {};
  }
  @Post('verify')
  @NoAuth()
  @ApiOperation({ summary: '验证信息' })
  Verify(): any {
    return {};
  }
  @Get('refreshToken')
  @NoAuth()
  @ApiOperation({ summary: '刷新Token' })
  refreshToken(): any {
    return {};
  }
  @Get('userInfo')
  @ApiOperation({ summary: '获取登录用户信息' })
  userInfo(): any {
    return {};
  }
  @Get('userAccessToken')
  @ApiOperation({ summary: '获取登录用户身份' })
  userAccessToken(): any {
    return {};
  }
  @Post('logout')
  @ApiExtension('x-author', 'DoveAz')
  @ApiOperation({ summary: '注销' })
  logout(): any {
    return {};
  }
}
