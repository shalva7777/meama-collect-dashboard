import {Component, ContentChild, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'cap-column',
  template: '',
})
export class CapColumnComponent {

  @Input() header: string;
  @Input() field: string;
  @Input() filtered: string;
  @Input() filteredOptions: any[];
  @Input() filteredFieldName: string;
  @Input() filteredOptionName: string;
  @Input() filteredOptionValue: string;
  @Input() filteredOptionReturnObject: boolean;
  @Input() filteredOptionColumns: any[];
  @Input() returnFieldName: string;
  @Input() hidden: boolean;
  @Input() incremental: boolean = false;
  @Input() linkTo: string;
  @Input() capPattern: string;
  @Input() capRequired: boolean;
  @Input() alertText: string;
  @Input() enabled: boolean;
  @Input() viewMode: boolean;
  @Input() getDataToView: Function;
  @Input() sortable: boolean;
  @Input() notObjectProperty: boolean;
  @Input() onDynamicSearchFunction: Function;
  @Output() onSearchFunction = new EventEmitter();
  @ContentChild('dataTableCell') cellTemplate;

  constructor() {
    this.enabled = true;
  }

  public onSearchedFunction(bla) {
    this.onSearchFunction.emit(bla);
  }

}
