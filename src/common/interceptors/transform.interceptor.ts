import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResponse<T> {
  data: T;
  message?: string;
  statusCode: number;

  currentPage?: number;
  totalPages?: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        let res: IResponse<any> = {
          message: data.message || 'request success',
          statusCode: statusCode,
          data: data.result,
        };

        if (!!response.currentPage) {
          res = {
            ...res,
            currentPage: response.currentPage,
          };
        }
        if (!!response.totalPages) {
          res = {
            ...res,
            totalPages: response.totalPages,
          };
        }

        return res;
      }),
    );
  }
}
