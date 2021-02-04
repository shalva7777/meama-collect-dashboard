/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngTemplateOutletContext directives.
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: 'cap-tab',
  styles: [
      `
      .pane {
        padding: 1em;
      }
    `
  ],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class CapTabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
  @Input() linkAble = true;
  @Input('link') link: string;
}
