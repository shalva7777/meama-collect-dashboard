import {Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges} from '@angular/core';
import {CapColumnComponent} from './cap-column.component';
import {Utils} from '../../services/utils';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {AccessService} from '../../services/access.service';
import {PagingLoader} from '../../models/loader';


@Component({
  selector: 'cap-table',
  templateUrl: 'cap-table.component.html',
  styleUrls: ['cap-table.component.scss'],
  host: {
    '(click)': 'handleClick($event)',
  }
})
export class CapTableComponent implements OnInit, OnChanges {

  @Input() items: any[] = [];
  @ContentChildren(CapColumnComponent) columns: QueryList<CapColumnComponent>;
  @Input() editable: boolean;
  @Input() addable: boolean;
  @Input() indexable: boolean;
  @Input() checkable: boolean;
  @Input() sendSms: boolean;
  @Input() searchable: boolean;
  @Input() pagination: boolean = true;
  @Input() reloadEvent: PagingLoader;
  @Input() showReloadButton: boolean;
  @Input() advanceFilter: boolean;
  @Input() advanceFilterAlwaysOn: boolean;
  @Input() sortable: boolean;
  @Input() identifier: string;
  @Input() viewMode: true;
  @Input() customButtonIcon: string;
  @Input() duplicate: boolean;
  @Input() onPageChange: Function;
  @Input() onFilteredClick: Function;
  @Input() disableHandleClick: boolean;
  // @Input() showExcelButton: boolean = true;

  @Output() rowDoubleClick = new EventEmitter();
  @Output() rowClick = new EventEmitter();
  @Output() onAddButtonClick = new EventEmitter();
  @Output() onCheckBoxClick = new EventEmitter();
  @Output() onSendSmsClick = new EventEmitter();
  @Output() onCustomButtonClick = new EventEmitter();
  @Output() onReloadClick = new EventEmitter();
  @Output() onIndexButtonClick = new EventEmitter();

  pageNum: number;
  recordsCount: number;
  currentPage: number = 0;
  pageNumOptions: any[];
  pageLimit: number;
  beingFiltered: boolean;
  filterRequest: {} = {};
  query: string = '';

  constructor(public utils: Utils,
              public activatedRoute: ActivatedRoute,
              public router: Router,
              public accessService: AccessService,
              public modalService: NgxSmartModalService) {
    this.initPageNumOptions();
    this.pageLimit = this.pageNumOptions[0].value;
    this.showReloadButton = true;
  }


  ngOnInit(): void {
    this.currentPage = 0;
    this.filterRequest = {};
    if (this.router.parseUrl(this.router.url).queryParams && Object.keys(this.router.parseUrl(this.router.url).queryParams).length != 0) {
      setTimeout(() => {
        this.advanceSearch(this.router.parseUrl(this.router.url).queryParams);
      }, 0);
    } else {
      this.setNewPageNumOptions(10);
    }
    this.advanceAlwaysOn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reloadEvent) {
      if (changes.reloadEvent.currentValue && changes.reloadEvent.currentValue.initialPage) {
        this.currentPage = 0;
      }
      if (this.router.parseUrl(this.router.url).queryParams && Object.keys(this.router.parseUrl(this.router.url).queryParams).length != 0) {
        setTimeout(() => {
          this.advanceSearch(this.router.parseUrl(this.router.url).queryParams);
        }, 0);
      } else {
        this.reload();
      }
    }
  }

  public initPageNumOptions() {
    this.pageNumOptions = [];
    this.pageNumOptions[0] = {id: 10, value: 10};
    this.pageNumOptions[1] = {id: 25, value: 25};
    this.pageNumOptions[2] = {id: 50, value: 50};
    this.pageNumOptions[3] = {id: 100, value: 100};
  }

  public rowDoubleClicked(row, event) {
    if (this.editable) {
      this.rowDoubleClick.emit({row, event});
    }
  }

  public rowClicked(row, event) {
    this.rowClick.emit({row, event});
  }

  public onAddButtonClicked(event) {
    this.onAddButtonClick.emit({event});
  }

  public onIndexButtonClicked(event) {
    this.onIndexButtonClick.emit({event});
  }

  public onCheckBoxClicked(event) {
    this.onCheckBoxClick.emit({event});
  }

  public onSendSmsClicked(event) {
    this.onSendSmsClick.emit({event});
  }

  additionalInfoOrRedirect(column, value) {
    if (column.linkTo) {
      this.redirectTo(column.linkTo, value);
    } else if (column.viewMode) {
      this.openAdditionalInfoModal(column, value);
    }
  }

  selectedColumnItem: any;

  async openAdditionalInfoModal(column: CapColumnComponent, value) {
    this.selectedColumnItem = await column.getDataToView(value);
    setTimeout(() => {
      this.modalService.getModal('columnViewModal').open(true);
    }, 0);
  }

  redirectTo(linkTo, value) {
    if (!linkTo) {
      return;
    }
    this.activatedRoute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      if (this.utils.isObject(value)) {
        window.open(url + linkTo + '=' + value['id'], '_blank');
      } else {
        window.open(url + linkTo + '=' + value, '_blank');
      }
      window.focus();
    }).unsubscribe();
  }

  public onTermSearched(searchedTerm) {
    this.currentPage = 0;
    this.query = searchedTerm;
    this.beingFiltered = false;
    this.reload();
  }

  public onPageChanged(requestedPage) {
    this.currentPage = requestedPage - 1;
    this.reload();
  }

  public getTrimmedArray(num) {
    if (this.pageNum && this.pageNum > num) {
      let arr = [];
      let end = this.currentPage + num;
      if (end > this.pageNum) {
        end = this.pageNum;
      }
      let start = end - this.currentPage > num ? this.currentPage : end - num;
      for (let i = start; i < end; i++) {
        arr[i - start] = i + 1;
      }
      return arr;
    } else {
      return Array(this.pageNum).fill(this.pageNum, 0, this.pageNum).map((e, i) => i + 1);
    }
  }

  onNextClicked() {
    if (!(this.currentPage == this.pageNum - 1 || this.pageNum == 0)) {
      this.currentPage++;
      this.reload();
    }
  }

  onPrevClicked() {
    if (!(this.currentPage == 0 || (this.pageNum == 0))) {
      this.currentPage--;
      this.reload();
    }
  }

  onFirstClicked() {
    if (!(this.currentPage == 0 || (this.pageNum == 0))) {
      this.currentPage = 0;
      this.reload();
    }
  }

  onLastClicked() {
    if (!(this.currentPage == this.pageNum - 1 || this.pageNum == 0)) {
      this.currentPage = this.pageNum - 1;
      this.reload();
    }
  }


  setNewPageNumOptions(value) {
    this.pageLimit = value;
    this.currentPage = 0;
    this.reload();
  }

  async reload() {
    if (!this.beingFiltered) {
      if (!this.onPageChange) {
        return;
      }
      let pathParamsObj = this.utils.clean(this.query ? Object.assign({query: this.query}, this.sortingObj) : this.sortingObj);
      let response = await this.onPageChange({
        pathParams: pathParamsObj,
        limit: this.pageLimit,
        offset: this.currentPage * this.pageLimit
      });
      if (!response) {
        return;
      }
      this.items = this.pagination ? response.resultList : response;
      if (this.pagination) {
        this.pageNum = response.pageNum;
        this.recordsCount = response.count;
      }
    } else {
      if (!this.onFilteredClick) {
        return;
      }
      this.advanceSearch(this.filterRequest);
    }
  }

  async onFilteredClicked() {
    this.currentPage = 0;
    this.advanceSearch(this.filterRequest);
  }

  async advanceSearch(filter) {
    filter = this.utils.clean(Object.assign(filter, this.sortingObj));
    const response = await this.onFilteredClick({
      pathParams: filter,
      limit: this.pageLimit,
      offset: this.currentPage * this.pageLimit
    });
    if (!response) {
      return;
    }
    this.items = this.pagination ? response.resultList : response;
    if (this.items.length == 0) {
      this.modalService.setModalData({
        body: 'No records found'
      }, 'alertModal', true);
      this.modalService.getModal('alertModal').open(true);
    }
    if (this.pagination) {
      this.pageNum = response.pageNum;
      this.recordsCount = response.count;
    }
  }

  advanceAlwaysOn() {
    this.beingFiltered = this.advanceFilterAlwaysOn;
  }

  clearFilterInputs() {
    this.filterRequest = {};
    console.log(this.filterRequest);
    this.currentPage = 0;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleClick(event) {
    if (this.disableHandleClick) {
      return;
    }
    let clickedComponent = event.target;
    [].forEach.call(document.querySelectorAll('.selected-row'), function(row) {
      row.classList.remove('selected-row');
    });

    [].forEach.call(document.querySelectorAll('tbody tr'), function(row) {
      while (clickedComponent) {
        clickedComponent = clickedComponent.parentNode;
        if (clickedComponent === row) {
          clickedComponent.classList.add('selected-row');
          return;
        }
      }
      clickedComponent = event.target;
    });
  }

  onReloadClicked() {
    this.onReloadClick.emit();
    this.reload();
  }

  selectedItem: any;

  openViewMode(i) {
    this.selectedItem = this.items[i];
    this.modalService.getModal('viewModal').open();
  }

  onCustomClicked() {
    this.onCustomButtonClick.emit();
  }

  makeCopy(item) {
    this.onAddButtonClick.emit({item});
  }

  sortingObj: any = {};

  sortingClicked(field, isSortable) {
    if (!isSortable) {
      return;
    }
    if (!this.sortingObj['orderBy'] || this.sortingObj['orderBy'] != field) {
      this.sortingObj['orderBy'] = field;
      this.sortingObj['asc'] = true;
      this.reload();
      return;
    }
    if (this.sortingObj['orderBy'] && this.sortingObj['orderBy'] == field) {
      if (!this.sortingObj['asc']) {
        this.sortingObj = {};
      } else {
        this.sortingObj['asc'] = !this.sortingObj['asc'];
      }
      this.reload();
      return;
    }
  }
}
