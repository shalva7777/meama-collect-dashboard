import {Injectable} from '@angular/core';

// import 'rxjs/add/operator/toPromise';
import {BaseService} from './base.service';

@Injectable()
export class PrivilegeService {

  public url = 'api/auth/roles';

  constructor(public baseService: BaseService) {
  }

  findPrivileges(): Promise<{}> {
    return this.baseService.get(this.url + '/privileges', {});
  }
}
