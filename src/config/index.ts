const env = process.env.NODE_ENV || 'production';
const defaultConfig = require('./config.default');
const config = require(`./config.${env}`);

export default {
  ...defaultConfig,
  ...config,
};
