import {Component, Input, OnInit} from '@angular/core';
import {UploadFileService} from '../../services/upload-file.service';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'cap-upload',
  templateUrl: 'cap-upload.component.html',
  styleUrls: ['./cap-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;

  @Input() fieldObject: any;
  @Input() fieldName: string;
  @Input() prevFieldObject: any;

  constructor(public uploadService: UploadFileService,
              public modalService: NgxSmartModalService) {
  }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else if (file.type.match('.html')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  // onCancelClicked() {
  //   if (this.fieldObject && this.prevFieldObject && this.fieldObject[this.fieldName] != this.prevFieldObject[this.fieldName]) {
  //     this.deleteFile(this.fieldObject[this.fieldName]);
  //   }
  // }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    if (this.currentFileUpload.size / 1000 >= 10000) {
      this.modalService.setModalData({
        body: 'File size exceeds 500 kb'
      }, 'alertModal', true);
      this.modalService.getModal('alertModal').open(true);
      return;
    }
    let prevImage;
    if (this.fieldObject[this.fieldName]) {
      prevImage = this.fieldObject[this.fieldName];
    }
    this.uploadService.pushFileToStorage(this.currentFileUpload).then((response) => {
      this.showFile(response);
      if (prevImage) {
        if (this.prevFieldObject && this.prevFieldObject[this.fieldName] && this.prevFieldObject[this.fieldName] != prevImage) {
          this.deleteFile(prevImage);
        }
      }
    });
    this.selectedFiles = undefined;
  }

  removeImg() {
    this.fieldObject[this.fieldName] = null;
  }

  public showFile(filename) {
    this.uploadService.getImage(filename).then((response) => {
      this.fieldObject[this.fieldName] = response;
    });
  }

  deleteFile(prevImage) {
    this.uploadService.deleteImage(prevImage);
  }
}
