import {Component, ContentChildren, Input, QueryList} from '@angular/core';
import {CapColumnComponent} from '../cap-table/cap-column.component';
import {ActivatedRoute} from '@angular/router';
import {Utils} from '../../services/utils';

@Component({
  selector: 'cap-static-table',
  templateUrl: 'cap-static-table.component.html',
  styleUrls: ['../cap-table/cap-table.component.scss'],
  host: {
    '(click)': 'handleClick($event)',
  }
})

export class CapStaticTableComponent {
  @Input() items: any[] = [];
  @ContentChildren(CapColumnComponent) columns: QueryList<CapColumnComponent>;

  constructor(public activatedRoute: ActivatedRoute,
              public utils: Utils){

  }

  redirectTo(linkTo, value) {
    if (!linkTo) return;
    this.activatedRoute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      if (this.utils.isObject(value)){
        window.open(url + linkTo + "=" + value['id'],'_blank');
      } else{
      window.open(url + linkTo + "=" + value,'_blank');
      }
      window.focus();
    }).unsubscribe();
  }

  handleClick(event) {
    let clickedComponent = event.target;
    [].forEach.call(document.querySelectorAll('.selected-row'), function (row) {
      row.classList.remove('selected-row');
    });

    [].forEach.call(document.querySelectorAll('tbody tr'), function (row) {
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

}
