import {Component} from '@angular/core';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {LanguageService} from '../../services/language.service';
import {AccessService} from '../../services/access.service';
import {PagingLoader} from '../../models/loader';
import {Language} from '../../models/atom/language';
import { Utils } from '../../services/utils';


@Component({
  selector: 'language',
  templateUrl: './language.component.html',
})

export class LanguageComponent {

  selectedLanguage: Language;
  loader: PagingLoader = new PagingLoader(true, true);
  isManage: boolean;


  constructor(public languageService: LanguageService,
              public accessService: AccessService,
              public utils: Utils,
              public modalService: NgxSmartModalService) {
    // this.isManage = this.accessService.containsPrivilege('language_manage');
    this.isManage = true;
  }

  getLanguages = (request) => {

    return this.languageService.find(request.limit, request.offset, request.pathParams).then(
      (response) => {
        return response;
      }
    );
  }

  showAddEditModal(language): void {
    this.selectedLanguage = (JSON.parse(JSON.stringify(language.row)) as Language);
    this.utils.setPrevObj(JSON.stringify(language.row));
    this.modalService.getModal('languageModal').open();
  }

  update() {
    this.languageService.update(this.selectedLanguage).then((response) => {
      this.modalService.getModal('languageModal').close();
      this.loader = this.loader.load(false);
    });
  }

  delete() {
    this.modalService.setModalData({
      body: 'Are you sure you want to delete this record?', onOkClicked: () => {
        this.modalService.getModal('confirmModal').close();
        this.languageService.delete(this.selectedLanguage.id).then((response) => {
          this.modalService.getModal('languageModal').close();
          this.loader = this.loader.load(true);
        });
      }
    }, 'confirmModal', true);
    this.modalService.getModal('confirmModal').open(true);
  }

  showAddModal($event: Event) {
    this.selectedLanguage = new Language;
    this.modalService.getModal('languageModal').open();
  }

  save() {
    this.languageService.save(this.selectedLanguage).then((response) => {
      this.modalService.getModal('languageModal').close();
      this.loader = this.loader.load(true);
    });
  }

  unmarkFromMainConfirm() {
    this.modalService.setModalData({
      body: 'Are you sure you want to unmark from main this language?', onOkClicked: () => {
        this.modalService.getModal('confirmModal').close();
        this.languageService.unmarkMain(this.selectedLanguage.id).then((response) => {
          this.selectedLanguage = response;
          this.loader = this.loader.load(true);
        });
      }
    }, 'confirmModal', true);
    this.modalService.getModal('confirmModal').open(true);
  }

  markAsMainConfirm() {
    this.modalService.setModalData({
      body: 'Are you sure you want to mark this language as main?', onOkClicked: () => {
        this.modalService.getModal('confirmModal').close();
        this.languageService.markAsMain(this.selectedLanguage.id).then((response) => {
          this.selectedLanguage = response;
          this.loader = this.loader.load(true);
        });
      }
    }, 'confirmModal', true);
    this.modalService.getModal('confirmModal').open(true);
  }
}
