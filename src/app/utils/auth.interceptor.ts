import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ErrorResult } from './global.dto';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let userService = inject(UserService);
  let loadingService = inject(NgxSpinnerService);
  let toastrService = inject(ToastrService)
  let accessToken;
  userService.getAccessToken$.subscribe(
    res => accessToken = res
  );
  loadingService.show();
  console.log("access", accessToken)
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(req)
    .pipe(
      catchError((err) => {
        debugger
        if (err.status === 400) {
          toastrService.error(JSON.stringify(JSON.parse(err.error)?.errors),JSON.parse( err.error)?.title)
          throw err;
        }
        else {
          const errorResult: ErrorResult = JSON.parse(err.error) as ErrorResult;
          toastrService.error(JSON.stringify(errorResult.DetailMessage), errorResult.Message)
          throw err;
        }

      }),
      finalize(() => {
        console.log("hide service");

        loadingService.hide()
      }
      )
    );
};
