
import {Component, Input} from "@angular/core";

@Component({
  selector: "cap-textarea",
  templateUrl: "cap-textarea.component.html"
})

export class CapTextareaComponent {

  @Input() label: string;
  @Input() enabled: boolean;
  @Input() fieldName: string;
  @Input() fieldObject: any;
  @Input() visible: boolean;
  @Input() capPattern: string;
  @Input() capRequired: boolean;
  @Input() alertText: string;
  @Input() placeholder: string;
  @Input() limited: boolean;
  @Input() characterLimit: number;
  @Input() disabled: boolean;


  constructor() {
    this.visible = true;
    this.enabled = true;
    this.limited = false;
    this.disabled = false;
  }

}
