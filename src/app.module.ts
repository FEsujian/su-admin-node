// AppModule用于加载其他模块
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalAuthGuard } from './common/guard/auth.guard';
import { JwtStrategy } from './common/strategy/jwt.strategy';
import { ExcelModule } from './modules/excel/excel.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { FilesModule } from './modules/files/files.module';
import { BaseModule } from './modules/base/base.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [() => config],
    }),
    TypeOrmModule.forRoot(config.database),
    AuthModule,
    ExcelModule,
    FilesModule,
    BaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      // 设置全局守卫
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
