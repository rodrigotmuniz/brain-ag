import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class AppHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('AppHttpExceptionFilter', exception);
    return throwError(() => exception);
  }
}
