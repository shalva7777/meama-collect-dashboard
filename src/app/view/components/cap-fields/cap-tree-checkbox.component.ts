import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";

@Component({
  selector: 'cap-tree-checkbox',
  templateUrl: 'cap-tree-checkbox.component.html',
})

export class CapTreeCheckboxComponent implements OnChanges {

  @Input() items: {};
  @Input() viewName: string;
  @Input() targetObject: any;
  @Input() targetObjectField: string;
  @Input() identifier: any;
  @Input() label: string;

  keys: any[] = [];
  allKeys: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && this.items) {
      this.keys = Object.keys(this.items);
      this.allKeys = Object.keys(this.items);
    }
  }

  onChanged(value, checked) {
    if (checked) {
      if (this.arrayContains(this.targetObject[this.targetObjectField], value, this.identifier) == -1) {
        this.targetObject[this.targetObjectField].push(value);
      }
    } else {
      if (this.arrayContains(this.targetObject[this.targetObjectField], value, this.identifier) > -1) {
        this.targetObject[this.targetObjectField].splice(this.arrayContains(this.targetObject[this.targetObjectField], value, this.identifier), 1);
      }
    }
  }

  public arrayContains(arr: any[], value, key) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] == value[key]) {
        return i;
      }
    }
    return -1;
  }

  allChildrenChecked(key) {
    let children = this.items[key];
    for (let i = 0; i < children.length; i++) {
      if (this.arrayContains(this.targetObject[this.targetObjectField], children[i], this.identifier) == -1) {
        return false;
      }
    }
    return true;
  }

  atLeastOneChildChecked(key){
    let children = this.items[key];
    for (let i = 0; i < children.length; i++) {
      if (this.targetObject[this.targetObjectField].some(role => role[this.identifier] === children[i][this.identifier])) {
        return true;
      }
    }
  }

  clearItems(){
    this.targetObject[this.targetObjectField] = [];
  }

  onParentChanged(key, checked) {
    let children = this.items[key];
    for (let i = 0; i < children.length; i++) {
      this.onChanged(children[i], checked);
    }
  }

  findInItems(value) {
    this.keys = this.allKeys.filter(key => key.toLowerCase().indexOf(value.toLowerCase()) != -1);
  }
}
