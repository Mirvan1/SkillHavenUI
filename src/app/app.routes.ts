import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './utils/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailComponent } from './components/pages/blog-detail/blog-detail.component';
import { EditBlogComponent } from './components/pages/blog/edit-blog/edit-blog.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }
,  
    {
        
        path: '',
        //canActivate:[authGuard],
         component: AppComponent
        //loadChildren:()=> import('./app.component').then(m=> m.AppComponent)
    },
    {
        path: 'register',
        // component: RegisterComponent
        loadChildren:()=> import('./components/user/register/register.component').then(m=> m.RegisterComponent)

    },
    {
        path: 'forgot-password',
        // component: ForgotPasswordComponent,
loadChildren:()=>import('./components/user/forgot-password/forgot-password.component').then(m=>m.ForgotPasswordComponent)
    },
    {
        path: 'reset-password',

        loadChildren:()=> import('./components/user/reset-password/reset-password.component').then(m=> m.ResetPasswordComponent)
        // component: ResetPasswordComponent
    },
    {
        path: 'home',
         canActivate: [authGuard],

         component: HomeComponent

    },
    {
        path: 'blog',
        canActivate: [authGuard],
        component: BlogComponent,
//loadChildren:()=> import('./components/pages/blog/blog.component').then(m=> m.BlogComponent),
  
children: [
          
        ]
    },
    {
        path: 'add-blog',
        canActivate: [authGuard],

        // component: EditBlogComponent
        loadChildren:()=> import('./components/pages/blog/edit-blog/edit-blog.component').then(m=> m.EditBlogComponent),

    },
    {
        path:'update-blog/:id',
        canActivate: [authGuard],
        loadChildren:()=> import('./components/pages/blog/edit-blog/edit-blog.component').then(m=> m.EditBlogComponent),
    },
    {
        path: 'blog-detail/:id',
        canActivate: [authGuard],
         loadChildren:()=> import('./components/pages/blog-detail/blog-detail.component').then(m=> m.BlogDetailComponent),
    },
    {
        path: 'login',
        loadChildren:()=> import('./components/user/login/login.component').then(m=> m.LoginComponent),
    },

    { path: "**",
component:NotFoundComponent    
}



];
