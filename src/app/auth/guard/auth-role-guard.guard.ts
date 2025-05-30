import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authRoleGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const expectedRole = route.data['role'];

  if (authService.getUserRole() === expectedRole) {
    return true;
  }

  return false

  //decidir o role com base no que estiver armazenado no serviço
};
