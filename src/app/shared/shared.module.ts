import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoPage404Component } from './pages/no-page404/no-page404.component';

@NgModule({
  declarations: [
    NoPage404Component,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NoPage404Component,
  ]
})
export class SharedModule { }
