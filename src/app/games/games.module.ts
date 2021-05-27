import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageModule } from './pages/game-page.module';


@NgModule({
  declarations:[],
  imports: [
    CommonModule,
    GamePageModule,
  ],
  exports:[
    GamePageModule
  ]
})
export class GamesModule { }
