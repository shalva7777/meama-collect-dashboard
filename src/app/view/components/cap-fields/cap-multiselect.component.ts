import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'cap-multiselect',
  templateUrl: 'cap-multiselect.component.html',
})

export class CapMultiselectComponent {
  items: any[];
  @Input() data: any[];
  @Input() fieldObject: any;
  @Input() fieldName: string;
  @Input() textField: string;
  @Input() idField: string;
  @Input() returnFieldName: string;

  @Output() onDataChange = new EventEmitter();


  constructor() {
  }

  onSelected(item) {
    console.log(item)
    if (!this.fieldObject[this.fieldName]) {
      this.fieldObject[this.fieldName] = [];
    }
    if (this.returnFieldName) {
      this.fieldObject[this.fieldName] = (item[this.returnFieldName]);
    } else if (!this.returnFieldName){
      this.fieldObject[this.fieldName] = this.items;
    }
  }

  onDeSelected(item) {
    console.log(item)
    if (this.returnFieldName) {
      let index = this.fieldObject[this.fieldName].indexOf(item[this.returnFieldName]);
      if (index > -1) {
        this.fieldObject[this.fieldName].splice(index, 1);
      }
    } else if (!this.returnFieldName){
      this.fieldObject[this.fieldName] = this.items;
    }
  }

}
