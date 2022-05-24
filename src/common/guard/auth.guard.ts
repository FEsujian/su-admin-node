import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IAuthGuard, AuthGuard } from '@nestjs/passport';
@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());
    if (noAuth) {
      return true;
    }
    const guard = GlobalAuthGuard.getAuthGuard(noAuth);

    // 执行所选策略Guard的canActivate方法
    return guard.canActivate(context);
  }

  // 根据NoAuth的t/f选择合适的策略Guard
  private static getAuthGuard(noAuth: boolean): IAuthGuard {
    if (noAuth) {
      return new (AuthGuard('local'))();
    } else {
      return new (AuthGuard('jwt'))();
    }
  }
}
