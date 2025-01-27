import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch(Error)
export class AppErrorFilter implements ExceptionFilter<Error> {
  catch(exception: Error, host: ArgumentsHost) {
    console.log('AppErrorFilter', exception);
    return throwError(() => exception.message);
  }
}
