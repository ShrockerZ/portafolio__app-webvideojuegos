import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoPage404Component } from './shared/pages/no-page404/no-page404.component';

const routes: Routes = [
  //--> /games         
  {path:'games', loadChildren:
      ()=>import('./games/games.module').then(m=>m.GamesModule)},
  //--> /auth   
  {path:'auth', loadChildren:
      ()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  //--> defautl:  /games/store  
  {path:'',pathMatch:'full',redirectTo:'/games/store' },
  {path:'**',component:NoPage404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


