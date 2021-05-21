import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    LayoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],exports:[
    AuthRoutingModule
  ]
})
export class AuthPageModule { }
