import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); 
  const router = inject(Router); 
console.log(authService.isLoggedIn())
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/Login']);
    return false; 
  }
};
