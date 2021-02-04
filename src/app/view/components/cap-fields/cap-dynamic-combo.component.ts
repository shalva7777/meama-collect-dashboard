import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import {CapDynamicComboColumnComponent} from './cap-dynamic-combo-column.component';

@Component({
  selector: 'cap-dynamic-component',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: 'cap-dynamic-combo.component.html',
})

export class CapDynamicComboComponent implements OnChanges {

  @Input() values: any[];
  @Input() selectedObject: string;
  @ContentChildren(CapDynamicComboColumnComponent) columns: QueryList<CapDynamicComboColumnComponent>;

  @Input() displayFieldName: string;
  @Input() returnFieldName: string;
  @Input() label: string;
  @Input() fieldName: string;
  @Input() object: any;
  @Input() returnObject: boolean;
  @Input() searchable: boolean = true;
  @Input() placeholder: string;
  @Input() isRequired: boolean = false;
  @Input() alertText: string;
  @Input() enabled: boolean;

  @Input() onSearch: Function;
  @Output() onDataChange = new EventEmitter();

  value: string = '';
  optionId: string = '';
  option: number = 0;
  inside: boolean = false;
  elementRef;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
    this.enabled = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.object && this.object[this.fieldName]) {
      if (this.selectedObject && this.displayFieldName) {
        this.value = this.object[this.selectedObject][this.displayFieldName];
      } else if (this.displayFieldName) {
        this.value = this.object[this.fieldName][this.displayFieldName];
      } else {
        this.value = this.object[this.fieldName];
      }
    } else {
      this.value = '';
    }
    this.onDataChange.emit(this.value);
  }

  async onSearched(term) {
    if (!this.enabled || !this.searchable) {
      return;
    }
    if (term === null) {
      term = '';
    }
    this.values = await this.onSearch(term);
  }

  chooseOption(item) {
    if (!item) {
      return;
    }
    if (!this.returnObject && item) {
      this.object[this.fieldName] = item[this.returnFieldName];
    } else {
      this.object[this.fieldName] = item;
    }
    if (this.displayFieldName) {
      this.value = item[this.displayFieldName];
    } else if (item['name']) {
      this.value = item['name'];
    } else if (this.returnFieldName) {
      this.value = item[this.returnFieldName];
    } else {
      this.value = item;
    }
    this.inside = false;

    this.onDataChange.emit(this.value);
  }

  handleClick(event) {
    let clickedComponent = event.target;
    this.inside = false;
    if (clickedComponent == document.querySelectorAll('cap-dynamic-component .additional-input-button i')[0]) {
      return;
    }
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        this.onSearched(this.value);
        this.inside = true;
        this.option = -1;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
  }

  keyDownFunction(event) {
    if (this.inside) {

      if (this.optionId) {
        document.getElementById(this.optionId).classList.remove('selected-row');
      }

      if (this.values) {

        if (event.keyCode == 40) {
          this.option++;
          if (this.option > this.values.length - 1) {
            this.option = 0;
          }
          this.chooseOption(this.values[this.option]);
          this.optionId = (this.option).toString();
        }

        if (event.keyCode == 38) {
          this.option--;
          if (this.option < 0) {
            this.option = this.values.length - 1;
          }
          this.chooseOption(this.values[this.option]);
          this.optionId = (this.option).toString();
        }

      }

      this.inside = event.keyCode != 13;

      if (this.optionId) {
        document.getElementById(this.optionId).classList.add('selected-row');
      }
    }
  }
}
