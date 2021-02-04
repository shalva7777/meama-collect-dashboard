import {Component, Input} from '@angular/core';

@Component({
  selector: 'cap-checkbox',
  templateUrl: 'cap-checkbox.component.html'
})

export class CapCheckboxComponent {

  @Input() label: string;
  @Input() enabled = true;
  @Input() fieldName: string;
  @Input() fieldObject: any;
  @Input() visible = true;
  @Input() removable: boolean;
  @Input() capRequired: boolean;
  @Input() alertText: string;

}
