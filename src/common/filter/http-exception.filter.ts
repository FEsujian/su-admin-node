/**
 * 捕获 HttpException 异常
 *
 */

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import config from '../../config';
type myError = {
  readonly status: number;
  readonly statusCode?: number;
  readonly message?: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger();

  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : (exception as myError)?.status ||
          (exception as myError)?.statusCode ||
          HttpStatus.INTERNAL_SERVER_ERROR;
    const code = exception.getStatus() || '500';
    const exceptionRes: any = exception.getResponse();
    const exceptionMessage: string = exceptionRes.message
      ? Array.isArray(exceptionRes.message)
        ? exceptionRes.message[0]
        : exceptionRes.message
      : exceptionRes || '未知错误';
    const message: any = exception.message || '未知错误';
    // 不拦截swagger错误
    if (String(request.url).startsWith('/' + config.swagger.url)) return;
    // 不拦截favicon错误
    if (String(request.url).startsWith('/favicon.ico')) return;
    this.logger.error(
      JSON.stringify({
        message,
        ip: request.ip,
        time: new Date().toLocaleString(),
        path: request.url,
      }),
    );
    response.status(code).json({
      ok: 0,
      statusCode: status,
      message: exceptionMessage,
      timestamp: new Date().toISOString(),
      path: decodeURI(request.url),
    });
  }
}
