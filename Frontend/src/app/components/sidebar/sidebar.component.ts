import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  collapseShow = 'hidden';
  faBars = faBars;
  faTimes = faTimes;
  router = inject(Router);
  authService = inject(AuthService);

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }
}
