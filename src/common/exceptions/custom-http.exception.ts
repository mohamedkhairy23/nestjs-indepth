import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpExcepion extends HttpException {
  constructor() {
    super('Custom Exception', HttpStatus.AMBIGUOUS);
  }
}
