import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
