import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { throwError } from 'rxjs'
import { QueryFailedError } from 'typeorm'

@Catch(QueryFailedError)
export class AppQueryFailedErrorFilter implements ExceptionFilter<QueryFailedError> {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    console.log('AppQueryFailedErrorFilter', exception.message)
    console.log('AppQueryFailedErrorFilter', exception.name)
    return throwError(() => ({
      message: exception.message,
      status: 409,
    }))
  }
}
