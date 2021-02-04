import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cap-input',
  templateUrl: './cap-input.component.html',
  styleUrls: ['./cap-input.component.css']
})
export class CapInputComponent implements OnInit {

  @Input() label: string;
  @Input() enabled: boolean;
  @Input() fieldName: string;
  @Input() fieldObject: any;
  @Input() fieldType: string;
  @Input() placeholder: string;
  @Input() capPattern: string;
  @Input() capRequired: boolean;
  @Input() alertText: string;
  @Input() addon: string;

  @Output() onEnter = new EventEmitter();

  constructor() {
    this.enabled = true;
  }

  public onEnterPressed() {
    this.onEnter.emit();
  }

  ngOnInit(): void {
  }

}
