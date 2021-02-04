import { Component, OnInit } from '@angular/core';
import {PagingLoader} from '../../models/loader';
import {Role} from '../../models/security/role';
import {RoleService} from '../../services/role.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {AccessService} from '../../services/access.service';
import { Utils } from '../../services/utils';
import {PrivilegeService} from '../../services/privilege.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  privileges: {};
  selectedRole: Role;
  query: string;
  loader: PagingLoader = new PagingLoader(true, true);
  isManage: boolean;

  constructor(public roleService: RoleService, public privilegeService: PrivilegeService, public accessService: AccessService, public utils: Utils,
              public modalService: NgxSmartModalService) {
    // this.isManage = this.accessService.containsPrivilege('role_manage');
    this.isManage = true;
  }

  ngOnInit(): void {
    this.privilegeService.findPrivileges().then((response) => {
      this.privileges = response;
    });
  }

  getRoles = (request) => {
    return this.roleService.quickFind(request.limit, request.offset, request.pathParams).then(
      (response) => {
        return response;
      }
    );
  }

  showAddEditModal(role): void {
    this.selectedRole = (JSON.parse(JSON.stringify(role.row)) as Role);
    this.modalService.getModal('roleModal').open();

  }

  updateRole() {
    this.roleService.update(this.selectedRole).then((response) => {
      this.modalService.getModal('roleModal').close();
      this.loader = this.loader.load(false);
    });
  }

  deleteRole() {
    this.modalService.setModalData({
      body: 'Are you sure you want to delete this role?', onOkClicked: () => {
        this.modalService.getModal('confirmModal').close();
        this.roleService.delete(this.selectedRole.id).then(() => {
          this.modalService.getModal('roleModal').close();
          this.loader = this.loader.load(true);
        });
      }
    }, 'confirmModal', true);
    this.modalService.getModal('confirmModal').open(true);
  }

  showAddModal($event: Event) {
    this.selectedRole = new Role;
    this.modalService.getModal('roleModal').open();
  }

  saveRole() {
    this.roleService.create(this.selectedRole).then((response) => {
      this.modalService.getModal('roleModal').close();
      this.loader = this.loader.load(true);
    });
  }

  updateRolesData(searchedTerm) {
    this.query = searchedTerm;
  }


}
