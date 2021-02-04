import {Component, EventEmitter, Input, Output} from "@angular/core";
import {UploadFileService} from "../../services/upload-file.service";
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'cap-upload-modal',
  templateUrl: './cap-upload-modal.component.html'
})

export class CapUploadModal {

  @Input() fieldObject: any;
  @Input() fieldName: string;
  @Input() prevFieldObject: any;
  @Input() abilityToUpload: boolean = true;
  @Input() identifier: string;

  @Output() uploadImageClick = new EventEmitter();

  constructor(public uploadService: UploadFileService,
              public modalService: NgxSmartModalService){

  }

  deleteFile(prevImage) {
    this.uploadService.deleteImage(prevImage);
  }

  saveImage() {
    if (this.identifier){
      this.modalService.getModal(this.identifier).close();
    }  else {
      this.modalService.getModal("uploadImageModal").close();
    }
    this.uploadImageClick.emit();
  }

  closeModal() {
    if (this.fieldObject && this.prevFieldObject && this.fieldObject[this.fieldName] != this.prevFieldObject[this.fieldName]) {
      this.deleteFile(this.fieldObject[this.fieldName]);
      this.fieldObject[this.fieldName] = this.prevFieldObject[this.fieldName];
    }
    this.modalService.getModal("uploadImageModal").close();
  }
}
