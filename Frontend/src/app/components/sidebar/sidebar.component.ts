import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  collapseShow = 'hidden';
  faBars = faBars;
  faTimes = faTimes;
  constructor() {}

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
}
