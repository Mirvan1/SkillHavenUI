import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './utils/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailComponent } from './components/pages/blog-detail/blog-detail.component';

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
    path:'blog',
    canActivate:[authGuard],
    component:BlogComponent
},
{
    path:'blog-detail/:id',
    canActivate:[authGuard],
    component:BlogDetailComponent
},
{
    path:'login',
    component:LoginComponent
}
];
