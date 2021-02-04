import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/security/user';
import {PagingLoader} from '../../models/loader';
import {Role} from '../../models/security/role';
import {ChangePassword} from '../../models/security/changePassword';
import {UserService} from '../../services/user.service';
import {RoleService} from '../../services/role.service';
import {Utils} from '../../services/utils';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {AccessService} from '../../services/access.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('tabs') tabs;

  users: User[];
  selectedUser: User;
  passwordRepeated: string;
  loader: PagingLoader = new PagingLoader(true, true);
  roles: Role[];
  isManage: boolean;
  changePasswordPrivilege: boolean;
  changePassword: ChangePassword;
  userTypes: any[];

  constructor(public userService: UserService,
              public roleService: RoleService,
              public utils: Utils,
              public accessService: AccessService,
              public modalService: NgxSmartModalService) {
    // this.isManage = this.accessService.containsPrivilege('user_manage');
    // this.changePasswordPrivilege = this.accessService.containsPrivilege('change_password');
    this.isManage = true;
    this.changePasswordPrivilege = true;
    this.reloadAllData();
  }

  reloadAllData() {
    this.userService.types().then((response) => {
      this.userTypes = response;
    });
    this.roleService.quickFind(-1, -1, {}).then(
      (response) => {
        this.roles = response.resultList;
      }
    );
  }

  getUsers = (request) => {
    return this.userService.quickFind(request.limit, request.offset, request.pathParams).then(
      (response) => {
        return response;
      }
    );
  };

  getFilteredUsers = (request) => {
    return this.userService.advanceSearch(request.limit, request.offset, request.pathParams).then(
      (response) => {
        return response;
      }
    );
  };

  showAddEditModal(user): void {
    this.selectedUser = <User> JSON.parse(JSON.stringify(user.row));
    this.modalService.getModal('userModal').open();
    this.tabs.ngAfterContentInit();
  }

  updateUser() {
    if (this.selectedUser.type && (!this.selectedUser.roles || this.selectedUser.roles.length == 0)) {
      this.modalService.setModalData({
        body: 'Roles must be set to system user'
      }, 'alertModal', true);
      this.modalService.getModal('alertModal').open(true);
      return;
    }
    this.userService.update(this.selectedUser.id, this.selectedUser).then((response) => {
      this.modalService.getModal('userModal').close();
      this.loader = this.loader.load(false);
    });
  }

  showAddModal($event: Event) {
    // tslint:disable-next-line:new-parens
    this.selectedUser = new User;
    this.selectedUser.roles = [];
    this.passwordRepeated = '';
    this.modalService.getModal('userModal').open();
    this.tabs.ngAfterContentInit();
  }

  saveUser() {
    if (this.selectedUser.type && (!this.selectedUser.roles || this.selectedUser.roles.length == 0)) {
      this.modalService.setModalData({
        body: 'Roles must be set to system user'
      }, 'alertModal', true);
      this.modalService.getModal('alertModal').open(true);
      return;
    }
    this.userService.create(this.selectedUser).then((response) => {
      this.modalService.getModal('userModal').close();
      this.loader = this.loader.load(true);
      this.passwordRepeated = null;
    });
  }

  deactivationConfirm() {
    this.modalService.setModalData({
      body: 'Are you sure you want to deactivate user?',
      onOkClicked: () => {
        this.userService.deactivate(this.selectedUser.id).then((response) => {
          this.selectedUser = response;
          this.modalService.getModal('confirmModal').close();
          this.loader = this.loader.load(true);
        });
      }
    }, 'confirmModal', true);
    this.modalService.getModal('confirmModal').open(true);
  }

  activationConfirm() {
    this.modalService.setModalData({
      body: 'Are you sure you want to active user?', onOkClicked: () => {

        this.userService.activate(this.selectedUser.id).then((response) => {
          this.selectedUser = response;
          this.modalService.getModal('confirmModal').close();
          this.loader = this.loader.load(true);
        });
      }
    }, 'confirmModal', true);
    this.modalService.getModal('confirmModal').open(true);
  }

  openEditPasswordModal() {
    this.changePassword = new ChangePassword;
    this.modalService.getModal('changePasswordModal').open(true);

  }

  updatePassword() {
    this.changePassword.userId = this.selectedUser.id;
    this.userService.changePassword(this.selectedUser.id, this.changePassword).then((response) => {
      this.passwordRepeated = '';
      this.modalService.getModal('changePasswordModal').close();
    });
  }

  ngOnInit(): void {
  }
}
