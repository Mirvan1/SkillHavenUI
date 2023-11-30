import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './utils/auth.guard';

export const routes: Routes = [
{
    path:'',
    canActivate:[authGuard],
    component:AppComponent
}
];
