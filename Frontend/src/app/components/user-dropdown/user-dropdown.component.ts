import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent {
  isOpen = false;
  authService = inject(AuthService);
  router = inject(Router);
  
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onLogout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }
}
