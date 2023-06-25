import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let login = localStorage.getItem("login-key")
    if(login){
      const modifiedRequest = request.clone({
        setHeaders: {
          "login-key":login
        }
      });
      return next.handle(modifiedRequest);
    }
   else {
    return next.handle(request);
  }
  
}
}
