const env = process.env.NODE_ENV || 'production';
const defaultConfig = require('./config.default');
const envConfig = require(`./config.${env}`);
export default {
  ...defaultConfig,
  ...envConfig,
};
