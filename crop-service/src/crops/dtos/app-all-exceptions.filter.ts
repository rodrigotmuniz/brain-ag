import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class AppAllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('exception', exception);
    const response = host.switchToHttp().getResponse();

    const message = getMessage(exception);
    const statusCode = getStatusCode(exception);

    response.status(statusCode).json({ message });
  }
}

const getMessage = (exception: any) => {
  if (typeof exception === 'string') {
    return exception;
  }
  if (exception.response && exception.response.message) {
    return exception.response.message;
  }
  return exception.message ?? 'Unknown error!!!';
};

const getStatusCode = (exception) => {
  const statusCodeNumber = Number(exception.status);
  return isNaN(statusCodeNumber) ? 500 : statusCodeNumber;
};

// exception {
//   response: {
//     message: [
//       'property producerIds should not exist',
//       'name must be longer than or equal to 5 characters',
//       'producerId must be a positive number',
//       'producerId must be a number conforming to the specified constraints'
//     ],
//     error: 'Bad Request',
//     statusCode: 400
//   },
//   status: 400,
//   options: {},
//   message: 'Bad Request Exception',
//   name: 'BadRequestException'
// }
