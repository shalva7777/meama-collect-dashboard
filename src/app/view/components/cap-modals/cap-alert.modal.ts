import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cap-alert-modal',
  templateUrl: 'cap-alert.modal.html',
})

export class CapAlertModal implements OnInit {

  ngOnInit(): void {
  }

  @Input() modalMessage: string;
  @Input() modalTitle: string;
  @Input() customButtonName: string;
  @Input() customButtonFunction: Function;
}
