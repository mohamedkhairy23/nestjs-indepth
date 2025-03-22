import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Logger Middleware...');

    this.userService.findUsers();

    next();
  }
}

// export const loggerMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.log('Logger Middleware...');

//   next();
// };
