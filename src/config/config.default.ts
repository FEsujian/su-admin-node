import * as path from 'path';

module.exports = {
  cookie_key: 'nest',
  // 请求超时时间
  timeout: 50 * 1000,
  // 服务配置
  server: {
    port: 8088,
  },
  // 上传文件配置
  upload: {},
  // 模板配置
  view: {},
  // 静态文件配置
  static: {},
  // 网站配置
  site: {},
  // 安全配置
  security: {
    jwt: {
      secret_key: 'nestjs',
    },
  },
  // 日志配置
  log: {},
  // CORS配置
  cors: {
    enable: true,
    origins: ['http://localhost:*'],
  },
  // swagger配置
  swagger: {
    enable: true,
    url: 'swagger',
    title: 'NestJS Api文档',
    description: 'NestJS Api文档',
    version: '1.0',
    swaggerOptions: {
      explorer: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        active: true,
        theme: 'default',
      },
    },
  },
};
