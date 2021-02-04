import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {environment} from '../../../environments/environment';
import {constants} from '../../../environments/constants';
import {AccessService} from './access.service';
import {User} from '../models/security/user';

@Injectable()
export class AuthService {

  public _authenticated: boolean;
  public _loggedInUser: User;

  constructor(
    public http: HttpClient,
    public storage: LocalStorageService,
    public accessService: AccessService
  ) {
  }

  authenticate() {
    return this.http.get(environment.apiPrefix + 'api/auth/authorize')
      .toPromise()
      .then(response => {
        this._authenticated = !!response;
        return this._authenticated;
      })
      .catch(this.handleError);
  }

  authorizedUser(): Promise<User> {
    return this.http.get(environment.apiPrefix + 'api/auth/authorized-user')
      .toPromise()
      .then((response: User) => {
        this._loggedInUser = response;
        this.accessService.setPrivileges(response.privileges);
        this.authenticated = true;
        return response;
      }).catch(this.handleError);
  }

  login(credentials): Promise<any> {
    return this.http.post(environment.apiPrefix + 'api/auth/authorize', credentials)
      .toPromise()
      .then((response) => {
        this.storage.store(constants.authorization, response[constants.authorization]);
        this.authenticated = true;
        return this.authorizedUser().then(() => {
          return response;
        });
      }).catch(this.handleError);
  }

  load(): Promise<any> {
    return this.authenticate().then(() => {
      if (this.authenticated) {
        return this.authorizedUser().then(function (response) {
          return true;
        }).catch(error => {
          this.authenticated = false
        });
      }
    });
  }

  logout() {
    this.authenticated = false;
    return this.http.get(environment.apiPrefix + 'api/auth/logout')
      .toPromise()
      .then(response => {
        return response;
      })
  };

  get authenticated(): boolean {
    return this._authenticated;
  }

  get loggedInUser(): User {
    return this._loggedInUser;
  }

  set authenticated(authenticated) {
    if (!authenticated) {
      this.storage.clear(constants.authorization);
      this._loggedInUser = null;
    }
    this._authenticated = authenticated;
  }

  public handleError = (error): Promise<any> => {
    this._authenticated = false;
    throw error;
  }
}
