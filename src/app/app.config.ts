import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './utils/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormErrorStateMatcher } from './utils/global.dto';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    {provide: ErrorStateMatcher, useClass: FormErrorStateMatcher}

]
};
