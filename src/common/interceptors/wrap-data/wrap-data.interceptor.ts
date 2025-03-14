import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

// rxjs => Library for Reactive programming
// Observable => handle async operations and callbacks as streams

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // note: by context'ExecutionContext' I can change in coming request
    // note: by next'CallHandler' for handler executing and return response or go to next middleware

    // logic: Intercept Request
    console.log('Before, Request intercepting...', context);

    return next.handle().pipe(
      map((data) => {
        // logic: Intercept Response
        console.log('After, Response intercepting...', data);
        return { response: data };
      }),
    );
  }
}

// ## To generate interceptor example
// - nest g interceptor common/interceptors/wrap-data --no-spec
