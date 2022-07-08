import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
interface Response<T> {
  data: T;
}
/**
 * 正常返回数据封装
 *
 * @export
 * @class TransformInterceptor
 * @implements {NestInterceptor<T, Response<T>>}
 * @template T
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private logger: Logger = new Logger();
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const IncomingMessage = context.getArgs()[0];
    const ServerResponse = context.getArgs()[1];
    const { method, statusCode, route } = IncomingMessage;
    return next.handle().pipe(
      map((datas: any) => {
        const { data, page } = datas;
        return {
          ok: true,
          statusCode,
          data: data || datas,
          page,
          method,
          path: route.path,
          timestamp: new Date().toISOString(),
          message: 'Request Success',
        };
      }),
    );
  }
}
