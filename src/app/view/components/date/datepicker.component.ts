import {Component, Input} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'date-picker',
  templateUrl: 'datepicker.component.html'
})
export class DatePickerComponent {
  @Input() validationText: string;
  @Input() object: any;
  @Input() isRequired: boolean;
  @Input() fieldName: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() disabled: boolean;

  fromatDate: any;
  stringDate: string;

  setFieldValue() {
    // this.object[this.fieldName] = new Date(this.stringDate).toISOString().slice(0, -1);
    let tzoffset = (new Date(this.stringDate)).getTimezoneOffset() * 60000;
    this.object[this.fieldName] = (new Date(new Date(this.stringDate).getTime() - tzoffset)).toISOString().slice(0, -1);
    this.fromatDate = this.object[this.fieldName];
    this.object[this.fieldName] = this.object[this.fieldName] + 'Z';
  }

  ngDoCheck() {
    if (!this.object || !this.object[this.fieldName]) {
      this.stringDate = null;
      return;
    }
    let d = new Date(this.fromatDate);
    if (this.type == 'date') {
      this.stringDate = moment(d).format('YYYY-MM-DD');
    } else {
      this.stringDate = moment(d).format('YYYY-MM-DDTHH:mm:ss');
    }
  }
}
