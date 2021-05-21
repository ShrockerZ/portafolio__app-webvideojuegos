import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { GameRoutingModule } from './game-routing.module';
import { AccountComponent } from './account/account.component';
import { LibraryComponent } from './library/library.component';
import { StoreComponent } from './store/store.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DetailComponent } from './detail/detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    LayoutComponent,
    AccountComponent,
    LibraryComponent,
    StoreComponent,
    DetailComponent,
  ],
  imports: [
    NgxSpinnerModule, 
    CarouselModule,
    CommonModule,
    GameRoutingModule,
  ],exports:[
    GameRoutingModule
  ]
})
export class GamePageModule { }
