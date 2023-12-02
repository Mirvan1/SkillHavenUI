import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let userService=inject(UserService);
  let accessToken;
   userService.getAccessToken$.subscribe(
    res=> accessToken=res
  );
    console.log("access",accessToken)
  if(accessToken){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(req);
};
