import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {constants} from '../environments/constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public storage: LocalStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.storage && this.storage.retrieve(constants.authorization)) {
      request = request.clone({
        setHeaders: {
          Authorization: this.storage.retrieve(constants.authorization)
        }
      });
    }
    return next.handle(request);
  }
}
