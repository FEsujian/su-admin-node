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
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private logger: Logger = new Logger();
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          ok: 0,
          statusCode: HttpStatus.OK,
          data,
          timestamp: new Date().toISOString(),
          message: 'Request Success',
        };
      }),
    );
  }
}
