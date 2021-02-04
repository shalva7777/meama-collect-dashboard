import {Injectable} from '@angular/core';

@Injectable()
export class AccessService {

  privileges: {};

  public setPrivileges(privileges) {
    this.privileges = privileges;
  }

  public getPrivileges() {
    return this.privileges;
  }

  containsGroupName(groupName) {
    return this.privileges && !!this.privileges[groupName];
  }

  containsPrivilege(code) {
    let keys = Object.keys(this.privileges);
    for (let key in this.privileges) {
      let arr = this.privileges[key];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == code) {
          return true;
        }
      }
    }
    return false;
  }
}
