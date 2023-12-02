import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './utils/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';

export const routes: Routes = [
{
    path:'',
    //canActivate:[authGuard],
    component:AppComponent
},
{
    path:'home',
    canActivate:[authGuard],
    component:HomeComponent
},
{
    path:'login',
    component:LoginComponent
}
];
