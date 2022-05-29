import { join } from 'path';

module.exports = {
  database: {
    type: 'mysql',
    host: '81.69.35.7',
    port: 3306,
    username: 'huaneng',
    password: 'huaneng',
    database: 'huaneng',
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
