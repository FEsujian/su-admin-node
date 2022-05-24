module.exports = (appInfo) => {
  const defaultConfig = require('./config.default');
  const config: any = {};
  config.database = {
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
    // 驱动
    driver: require('mysql2'),
  };

  config.logger = {
    coreLogger: {
      consoleLevel: 'INFO',
    },
  };

  return { ...config, ...defaultConfig };
};
