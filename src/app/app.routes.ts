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
    {
        
        path: '',
        
        
        pathMatch: 'full',

        redirectTo:'home'
    },
    {
        path: 'register',
       
        loadComponent:()=>import('./components/user/register/register.component').then(x=>x.RegisterComponent)
    },
    {
        path: 'forgot-password',
      
      loadComponent:()=>import('./components/user/forgot-password/forgot-password.component').then(x=>x.ForgotPasswordComponent)

    },
    {
        path: 'reset-password',
       
       loadComponent:()=>import('./components/user/reset-password/reset-password.component').then(x=>x.ResetPasswordComponent)

    },
    {
        path: 'home',
        canActivate: [authGuard],
       
       loadComponent:()=>import('./components/home/home.component').then(x=>x.HomeComponent)

    },
    {
        path: 'blog',
        canActivate: [authGuard],
        loadComponent:()=>import('./components/pages/blog/blog.component').then(x=>x.BlogComponent)

    },
    {
        path: 'add-blog',
        canActivate: [authGuard],
        loadComponent:()=>import('./components/pages/blog/edit-blog/edit-blog.component').then(x=>x.EditBlogComponent)
       
    },
    {
        path:'update-blog/:id',
        canActivate: [authGuard],
       
       loadComponent:()=>import('./components/pages/blog/edit-blog/edit-blog.component').then(x=>x.EditBlogComponent)

    },
    {
        path: 'blog-detail/:id',
        canActivate: [authGuard],

loadComponent:()=>import('./components/pages/blog-detail/blog-detail.component').then(x=>x.BlogDetailComponent)

},
    {
        path: 'login',
        loadComponent:()=>import('./components/user/login/login.component').then(x=>x.LoginComponent)

        
    }
,
    {
        path: '**',
        loadComponent:()=>import('./components/not-found/not-found.component').then(x=>x.NotFoundComponent)
     
    }
];
