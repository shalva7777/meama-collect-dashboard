import {Component, Input} from '@angular/core';

@Component({
  selector: 'cap-color-picker',
  templateUrl: 'cap-color-picker.component.html'
})

export class CapColorPickerComponent {

  @Input() targetObject: any;
  @Input() targetObjectField: string;
  @Input() label: string;

}
