import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'cap-combo',
  templateUrl: 'cap-combo.component.html',
})

export class CapComboComponent {

  @Input() label: string;
  @Input() optionLabel: string;
  @Input() optionValue: any;
  @Input() values: any[];
  @Input() fieldName: string;
  @Input() fieldObject: any;
  @Input() removable: boolean;
  @Input() capRequired: boolean;
  @Input() alertText: string;
  @Input() returnObject: boolean;
  @Input() placeholder: string;
  @Input() enabled: boolean;

  @Output() onDataChange = new EventEmitter();

  constructor() {
    this.returnObject = true;
    this.enabled = true;
  }

  getValue(value) {
    for (let i = 0; i < this.values.length; i++) {
      if ('' + this.values[i][this.optionValue] == value) {
        if (this.returnObject) {
          this.fieldObject[this.fieldName] = this.values[i];
          this.onDataChange.emit(this.values[i]);
        } else {
          this.fieldObject[this.fieldName] = value;
          this.onDataChange.emit(value);
        }
        return;
      }
    }
    this.fieldObject[this.fieldName] = null;
    this.onDataChange.emit(null);
  }
}
