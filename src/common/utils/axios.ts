import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from '../../config';
interface MyAxiosRequestConfig extends AxiosRequestConfig {
  page?: Record<string, unknown>;
  sort?: Record<string, unknown>;
}

class BaseApi {
  public baseUrl: string = config.baseUrl;
  public version: string = config.baseVersion;
  public commonPrefixUrl = '';
  public prefixUrl = '';
  public axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 60000,
      withCredentials: true,
    });
    // 设置请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        config.url = this.generateRequestUrl(config.url);
        // 分页检测及过滤空数据
        if (config.page)
          config.params = this.filterEmptyData({
            ...config.params,
            ...config.page.getPageConfig(),
          });
        // 处理空数据
        if (config.data) config.data = this.filterEmptyData(config.data);
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
    // 设置响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        const { data, config } = response;
        // 分页数据处理
        if (config.page && data.page) {
          config.page.update(data.page);
        }
        return data;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
  /**
   * 过滤空数据
   * @param data
   */
  private filterEmptyData(data) {
    Object.entries(data)
      .filter(([key, value]) => {
        // 过滤空字符串
        if (value === undefined || value === '') {
          return true;
        }

        // 过滤空数组
        if (
          value instanceof Array &&
          (value.length === 0 || value.every((x) => x === ''))
        ) {
          return true;
        }
      })
      .forEach(([key, value]) => {
        delete data[key];
      });
    return data;
  }
  private generateRequestUrl(customUrl: any) {
    const urlReg = new RegExp(
      /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/,
    );
    if (urlReg.test(customUrl)) return customUrl;
    const url =
      this.baseUrl +
      this.version +
      this.commonPrefixUrl +
      this.prefixUrl +
      customUrl;
    return url;
  }
  public api(options: MyAxiosRequestConfig) {
    return this.axiosInstance.request(options) as any;
  }
}

export default BaseApi;
