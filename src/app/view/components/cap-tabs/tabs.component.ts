/**
 * The main component that renders single CapTabComponent
 * instances.
 */

import {AfterContentInit, Component, ContentChildren, OnInit, QueryList} from '@angular/core';

import {CapTabComponent} from './tab.component';

@Component({
  selector: 'cap-tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a *ngIf="tab.linkAble;else notLinkable" routerLink="{{tab.link ? tab.link : tab.title | lowercase}}">{{tab.title}}</a>
        <ng-template #notLinkable><a>{{tab.title}}</a></ng-template>

      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styles: [
      `
      .tab-close {
        color: gray;
        text-align: right;
        cursor: pointer;
      }
    `
  ]
})
export class CapTabsComponent implements AfterContentInit, OnInit {

  @ContentChildren(CapTabComponent) tabs: QueryList<CapTabComponent>;

  activeTabName: string;

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) =>  {
      if (this.activeTabName === tab.title) {
        tab.active = true;
        return tab.active;
      }
    });

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;
  }

  activateTab(tabTitle) {
    // deactivate all tabs
    this.tabs.toArray().forEach(t => {
      t.active = t.title == tabTitle;
    });
  }

  ngOnInit(){
    let currentUrl = window.location.href.split('#')[0].split('?')[0];
    let tabName = currentUrl.split('?')[0].substr(currentUrl.split('?')[0].lastIndexOf("/") + 1);
    this.activeTabName = tabName.charAt(0).toUpperCase() + tabName.slice(1);
  }

}
