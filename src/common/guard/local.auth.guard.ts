///auth.local.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// 自定义校验
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
