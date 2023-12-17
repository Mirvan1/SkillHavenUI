import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let userService=inject(UserService);
  let loadingService=inject( NgxSpinnerService);
  let accessToken;
   userService.getAccessToken$.subscribe(
    res=> accessToken=res
  );
  loadingService.show();
    console.log("access",accessToken)
  if(accessToken){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(req).pipe(
    finalize(()=>{
      console.log("hide service");
      
      loadingService.hide()
    }
    )
  );
};
