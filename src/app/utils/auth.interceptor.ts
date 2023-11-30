import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let userService=inject(UserService);

  let accessToken= userService.getAccessToken$.subscribe();

  if(accessToken){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userService.getAccessToken$}`
      }
    });
  }

  return next(req);
};
