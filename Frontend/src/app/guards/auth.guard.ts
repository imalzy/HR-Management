/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export function authenticationGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    if (authService.hasAccess()) {
      return true;
    }
    authService.goLogin();
    return false;
  };
}
