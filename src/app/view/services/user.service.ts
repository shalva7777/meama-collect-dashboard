import {Injectable} from '@angular/core';

import {BaseService} from './base.service';
import {Router} from '@angular/router';
import {User} from '../models/security/user';
import {ListResult} from '../models/response/list-result';
import {GeneralLookup} from '../models/request/general-lookup';
import {ChangePassword} from '../models/security/changePassword';

@Injectable()
export class UserService {

  public url = 'api/auth/users';

  constructor(public baseService: BaseService, public router: Router) {
  }

  advanceSearch(limit, offset, pathParams: {}): Promise<ListResult<User>> {
    return this.baseService.get(this.url + '/advance/' + limit + '/' + offset, pathParams);
  }

  quickFind(limit, offset, pathParams: {}): Promise<ListResult<User>> {
    return this.baseService.get(this.url + '/' + limit + '/' + offset, pathParams);
  }

  findWithoutDepartment(limit, offset, pathParams: {}): Promise<ListResult<User>> {
    return this.baseService.get(this.url + '/without-departments/' + limit + '/' + offset, pathParams);
  }

  findDistributorsQuick(limit, offset, pathParams: {}): Promise<ListResult<User>> {
    return this.baseService.get(this.url + '/distributors/' + limit + '/' + offset, pathParams);
  }

  types(): Promise<GeneralLookup[]> {
    return this.baseService.get(this.url + '/types', {});
  }

  create(user: User): Promise<User> {
    return this.baseService.post(this.url, user);
  }

  update(userId, user: User): Promise<User> {
    return this.baseService.put(this.url + '/' + userId, user);
  }

  changePassword(userId, body: ChangePassword): Promise<any> {
    return this.baseService.put(this.url + '/' + userId + '/password', body);
  }

  changeSelfPassword(body: ChangePassword): Promise<any> {
    return this.baseService.put(this.url + '/self/password', body);
  }

  editProfile(user: User): Promise<User> {
    return this.baseService.put(this.url + '/profile', user);
  }

  getLightWeightUsers(limit, offset, pathParams: {}): Promise<any> {
    return this.baseService.get(this.url + '/lightweight/' + limit + '/' + offset, pathParams);
  }

  activate(id: number): Promise<User> {
    return this.baseService.put(this.url + '/' + id + '/activate', null);
  }

  deactivate(id: number): Promise<User> {
    return this.baseService.put(this.url + '/' + id + '/deactivate', null);
  }

}
