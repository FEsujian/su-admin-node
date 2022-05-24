import { join } from 'path';

module.exports = {
  database: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'cool',
    // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
    synchronize: true,
    // 打印日志
    logging: true,
    // 字符集
    charset: 'utf8mb4',
    entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
    // 驱动
    driver: require('mysql2'),
  },
  logger: {
    coreLogger: {
      consoleLevel: 'INFO',
    },
  },
};
