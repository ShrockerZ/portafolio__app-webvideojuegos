import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageModule } from './pages/auth-page.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthPageModule
  ],
  exports:[
    AuthPageModule
  ]
})
export class AuthModule { }
