import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './utils/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailComponent } from './components/pages/blog-detail/blog-detail.component';
import { EditBlogComponent } from './components/pages/blog/edit-blog/edit-blog.component';
import { RegisterComponent } from './components/user/register/register.component';

export const routes: Routes = [
    {
        
        path: '',
        //canActivate:[authGuard],
        component: AppComponent
    },
    {
        path: 'register',
        component: RegisterComponent
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
        children: [
          
        ]
    },
    {
        path: 'add-blog',
        canActivate: [authGuard],

        component: EditBlogComponent
    },
    {
        path:'update-blog/:id',
        canActivate: [authGuard],
        component: EditBlogComponent
    },
    {
        path: 'blog-detail/:id',
        canActivate: [authGuard],
        component: BlogDetailComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
