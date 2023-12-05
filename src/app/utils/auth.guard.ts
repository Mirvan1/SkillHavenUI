import { createInjectableType } from '@angular/compiler';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return firstValueFrom(
    userService.getAccessToken$.pipe(
      map(accessToken => {
        console.log("Acces guard",accessToken)
        if(!accessToken){
          router.navigateByUrl('/login');
          return false;
        }
        console.log("Guard rreturn true")
        return true;;
      })
    )
  );
};
