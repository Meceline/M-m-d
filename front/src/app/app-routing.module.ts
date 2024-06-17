import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { ListComponent as ArticleListComponent } from './features/articles/components/list/list.component';
import { NewComponent } from './features/articles/components/new/new.component';
import { DetailsComponent } from './features/articles/components/details/details.component';

import { ListComponent as ThemeListComponent} from './features/themes/components/list/list.component';
import { UserProfileComponent } from './components/user-profil/user-profil.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'articles', component: ArticleListComponent },
      { path: 'articles/new', component: NewComponent },
      { path: 'articles/:id', component: DetailsComponent },
      { path: 'themes', component: ThemeListComponent },
      { path: 'userProfile', component: UserProfileComponent },
      { path: '', redirectTo: '/articles', pathMatch: 'full' }, 
     
    ]
  },
  
 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
