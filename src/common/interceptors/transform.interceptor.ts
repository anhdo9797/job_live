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
  totalCount?: number;
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

        if (!!data.currentPage) {
          res = {
            ...res,
            currentPage: data.currentPage,
          };
        }
        if (!!data.totalPages) {
          res = {
            ...res,
            totalPages: data.totalPages,
          };
        }
        if (!!data.total) {
          res = {
            ...res,
            totalCount: data.total,
          };
        }

        return res;
      }),
    );
  }
}
