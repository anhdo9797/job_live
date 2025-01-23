import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IResponse } from './transform.interceptor';

export function createErrorResponse<T>(
  data: T,
  message: string = 'An error occurred',
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
): HttpException {
  return new HttpException(
    {
      statusCode,
      success: false,
      message,
      data,
    },
    statusCode,
  );
}

@Injectable()
export class ErrorsInterceptor implements NestInterceptor<IResponse<any>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const isArray = Array.isArray(err.response?.message);
        const message = isArray ? err.response.message.join(', ') : err.message;

        return throwError(() =>
          createErrorResponse(null, message, err.status || 502),
        );
      }),
    );
  }
}
