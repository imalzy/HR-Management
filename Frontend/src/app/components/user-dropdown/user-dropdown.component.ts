import { Component, ViewChild, ElementRef } from '@angular/core';
// import { createPopper } from "@popperjs/core";

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent {
  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef:
    | ElementRef
    | undefined;
  @ViewChild('popoverDropdownRef', { static: false }) popoverDropdownRef:
    | ElementRef
    | undefined;
  // ngAfterViewInit() {
  // createPopper(
  //   this.btnDropdownRef.nativeElement,
  //   this.popoverDropdownRef.nativeElement,
  //   {
  //     placement: "bottom-start",
  //   }
  // );
  // }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleDropdown(event: any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
}
