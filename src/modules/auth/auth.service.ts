import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { BaseSysUserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(BaseSysUserEntity)
    private baseSysUserEntity: Repository<BaseSysUserEntity>,
  ) {}

  async getHello(): Promise<any> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello World!');
      }, 1500);
    });
  }
  /**
   * 生成token
   * @param user 用户对象
   * @param roleIds 角色集合
   * @param expire 过期
   * @param isRefresh 是否是刷新
   */
  async generateToken(user, roleIds, expire: string, isRefresh?) {
    return this.jwtService.sign(
      {
        isRefresh: isRefresh || false,
        roleIds,
        username: user.username,
        userId: user.id,
        passwordVersion: user.passwordV,
      },
      {
        expiresIn: expire,
      },
    );
  }

  /**
   * 登录
   * @param login
   */
  async login(login: LoginDto) {
    const { username, password } = login;
    const roleIds = [];
    const user = await this.baseSysUserEntity.findOne({
      where: {
        username: username,
      },
    });
    // 校验用户
    if (!user || user.status === 0 || user.password !== md5(password)) {
      // 校验用户状态及密码
      throw new HttpException(
        '用户名或密码错误！',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // // 校验角色
    // const roleIds = await this.baseSysRoleService.getByUser(user.id);
    // if (_.isEmpty(roleIds)) {
    //   throw new CoolCommException('该用户未设置任何角色,无法登录,请联系管理员！');
    // }

    // 生成token
    const { expire, refreshExpire } = {
      expire: '86400000', // expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
      refreshExpire: true,
    };
    const result = {
      expire,
      token: await this.generateToken(user, roleIds, expire),
      refreshExpire,
      refreshToken: await this.generateToken(user, roleIds, expire, true),
    };
    console.log(result, 'result');
    return result;
  }
}
