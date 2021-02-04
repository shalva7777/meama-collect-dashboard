import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Injectable()
export class Utils {

  constructor(public modalService: NgxSmartModalService) {

  }

  datePickerConfig: {} = {format: 'DD/MM/YYYY'};
  taskDatePickerConfig: {} = {format: 'DD/MM/YYYY HH:mm'};
  datetimeStandardConfig: {} = {format: 'DD/MM/YYYY HH:mm:ss'};

  prevObj: string;
  srcImg: string = 'assets/';

  public formIsValid(modalSelector: HTMLElement) {
    // setTimeout(() => {
    // }, 0);

    if (!modalSelector) {
      return false;
    }

    if (modalSelector.querySelectorAll('input.ng-invalid').length > 0) {
      return false;
    }
    return modalSelector.querySelectorAll('select[required].ng-invalid').length <= 0;

  }

  public convertToRegularDate(str) {
    const date = new Date(str),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2),
      hours = ('0' + date.getHours()).slice(-2),
      minutes = ('0' + date.getMinutes()).slice(-2),
      seconds = ('0' + date.getSeconds()).slice(-2);

    const myDate = [date.getFullYear(), month, day].join('-');
    const myTime = [hours, minutes, seconds].join(':');
    return [myDate, myTime].join(' ');
  }


  public convertToIndexedArray(arr) {
    let map = [];
    for (let i = 0; i < arr.length; i++) {
      map[i] = {id: arr[i], name: arr[i]};
    }
    return map;
  }

  public convertToGraphArray(arr, field1, field2) {
    let map = [];
    for (let i = 0; i < arr.length; i++) {
      map[i] = {y: arr[i][field1], x: arr[i][field2]};
    }
    return map;
  }

  public setPrevObj(prevObj) {
    this.prevObj = prevObj;
  }

  public getPrevObj() {
    if (this.prevObj) {
      return JSON.parse(this.prevObj);
    }
    return null;
  }


  public comparePrevAndCurrentObjects(curr) {
    return this.prevObj == JSON.stringify(curr);
  }

  public arrayFieldsAsArray(arr, field) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      res.push(arr[i][field]);
    }
    return res;
  }

  public formatDateArray(arr) {
    let res = [];
    let datePipe = new DatePipe('en-US');
    for (let i = 0; i < arr.length; i++) {
      res.push(datePipe.transform(arr[i], 'dd/MM/yyyy'));
    }
    return res;
  }

  public formatDateTimeArray(arr) {
    let res = [];
    let datePipe = new DatePipe('en-US');
    for (let i = 0; i < arr.length; i++) {
      res.push(datePipe.transform(arr[i], 'dd/MM/yyyy'));
    }
    return res;
  }

  public getByIdentifier(arr, field, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][field] == target) {
        return arr[i];
      }
    }
    return null;
  }

  public filterArrayByField(arr, field, target) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][field] == target) {
        res.push(arr[i]);
      }
    }
    return res;
  }

  public filterArrayIdentifierByField(arr, field, identifier, target) {
    if (!arr || !target) {
      return;
    }
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][field][identifier] == target[identifier]) {
        res.push(arr[i]);
      }
    }
    return res;
  }

  public containsArrayIdentifierByField(arr, field, identifier, target) {
    if (!arr || !target) {
      return;
    }
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][field][identifier] == target[identifier]) {
        return true;
      }
    }
    return false;
  }

  public filterArrayByFieldAndObject(arr, field, identifier, target, additionalFilterField, value) {
    if (!arr) {
      return;
    }
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (value != null) {
        if (arr[i][field][identifier] == target[identifier] && arr[i][additionalFilterField] != value[additionalFilterField]) {
          res.push(arr[i]);
        }
      } else {
        if (arr[i][field][identifier] == target[identifier]) {
          res.push(arr[i]);
        }
      }
    }
    return res;
  }


  arrContains(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == elem) {
        return true;
      }
    }
    return false;
  }

  arrContainsByField(arr, field, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][field] == target) {
        return i;
      }
    }
    return -1;
  }

  arrContainsByFieldAndField(arr, itemField, targetField, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][itemField][targetField] == target[targetField]) {
        return i;
      }
    }
    return -1;
  }

  checkIfIsIncremental(arr, field) {
    let map = [];
    for (let i = 0; i < arr.length; i++) {
      if (this.arrContains(map, arr[i][field])) {
        return false;
      }
      map.push(arr[i][field]);
    }
    return true;
  }

  public showAlert(text) {

    this.modalService.setModalData({
      body: text
    }, 'alertModal', true);
    this.modalService.getModal('alertModal').open(true);
  }

  public objectKeys(o) {
    return Object.keys(o);
  }

  public isObject(o) {
    if (!o) {
      return;
    }
    return o && typeof o === 'object';
  }

  public isArray(o) {
    return o && o.constructor === Array;
  }

  public isBoolean(o) {
    return typeof o === 'boolean';
  }

  public splitAndUppercase(word) {
    return word.replace(/([A-Z]+)/g, ' $1').replace(/^ /, '').toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  }

  public isImg(o) {
    if (typeof o == 'string' && (o.endsWith('.png') || o.endsWith('.jpg') || o.endsWith('.svg'))) {
      return true;
    }

    // return o && o.includes('.png');
  }

  public clean(obj) {
    for (let propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }

  public formatDate(dateStr: string) {
    return new Date(dateStr);
  }
}
