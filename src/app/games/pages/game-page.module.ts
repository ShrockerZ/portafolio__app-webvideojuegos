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
import { WishlistComponent } from './wishlist/wishlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameComponentModule } from '../components/game-components.module';
import { CleantextPipe } from '../pipes/cleantext.pipe';
import { AvatarModule } from 'ngx-avatar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    LayoutComponent,
    AccountComponent,
    LibraryComponent,
    StoreComponent,
    DetailComponent,
    WishlistComponent,
    CleantextPipe
  ],
  imports: [
    ReactiveFormsModule,
    NgxSpinnerModule, 
    CarouselModule,
    AvatarModule,
    InfiniteScrollModule,
    CommonModule,
    GameRoutingModule,
    GameComponentModule
  ],exports:[
    GameRoutingModule
  ]
})
export class GamePageModule { }
