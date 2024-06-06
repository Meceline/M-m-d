import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { MaterialModule } from '../material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListComponent as ArticleListComponent} from './features/articles/components/list/list.component';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { UserService } from './features/auth/services/user-service.service';
import { JwtInterceptor } from './features/auth/interceptors/jwt.interceptor';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NewComponent } from './features/articles/components/new/new.component';
import { DetailsComponent } from './features/articles/components/details/details.component';
import { ListComponent } from './features/themes/components/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ArticleListComponent,
    NavBarComponent,
    NewComponent,
    DetailsComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard, 
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
