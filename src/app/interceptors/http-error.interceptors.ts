import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ServiceErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = { title: 'ServerSide error', message: '' };
          if (error.error instanceof ErrorEvent) {
            // cliient side eror
            errorMessage.title = 'ClientSide error';
            errorMessage.message = error.error.message;
          } else {
            // server side error
            errorMessage.message = error.error.message;
            errorMessage.title = error.error.title ? error.error.title : errorMessage.title;
          }
          return throwError(errorMessage);
        })
      );
  }
}
