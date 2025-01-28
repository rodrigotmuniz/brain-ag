import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        console.log(888,context.getClass(), response)
        if (response == null) return {}
        const a =   response.data ? response : { data: response  }
        console.log('a', a)
        return a
      }),
    )
  }
}