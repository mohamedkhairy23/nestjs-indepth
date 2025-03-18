import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Logic on current request, (Before method execution)

    // To apply logic on request
    // const ctx = context.switchToHttp();
    // const request = ctx.getRequest<Request>();

    // request.body = { ...request.body, username: 'Test user' };

    // handle to apply logic on response
    return next.handle().pipe(
      timeout(3000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return err; // Ensure other errors are also propagated
      }),
    );
  }
}
