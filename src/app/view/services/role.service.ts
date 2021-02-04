import {Injectable} from '@angular/core';

// import 'rxjs/add/operator/toPromise';
import {BaseService} from './base.service';
import {ListResult} from '../models/response/list-result';
import {Role} from '../models/security/role';

@Injectable()
export class RoleService {

  public url = 'api/auth/roles';

  constructor(
    public baseService: BaseService,
  ) {
  }

  quickFind(limit, offset, pathParams: {}): Promise<ListResult<Role>> {
    return this.baseService.get(this.url + '/' + limit + '/' + offset, pathParams);
  }

  advanceSearch(limit, offset, pathParams: {}): Promise<ListResult<Role>> {
    return this.baseService.get(this.url + '/advance/' + limit + '/' + offset, pathParams);
  }

  create(role: Role): Promise<Role> {
    return this.baseService.post(this.url, role);
  }

  update(role: Role): Promise<Role> {
    return this.baseService.put(this.url + '/' + role.id, role);
  }

  delete(roleId): Promise<any> {
    return this.baseService.delete(this.url + '/' + roleId);
  }

  findPrivileges(): Promise<any> {
    return this.baseService.get(this.url + '/privileges', {});
  }
}
