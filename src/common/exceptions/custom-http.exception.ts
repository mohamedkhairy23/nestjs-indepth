import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpExcepion extends HttpException {
  constructor(message, statusCode) {
    super(message, statusCode);
  }
}
