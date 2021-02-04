import {Component, ContentChild, Input} from '@angular/core';

@Component({
  selector: 'cap-dynamic-column',
  template: '',
})
export class CapDynamicComboColumnComponent {

  @Input() field: string;
  @ContentChild('dynamicComboColumn') colTemplate;
}
