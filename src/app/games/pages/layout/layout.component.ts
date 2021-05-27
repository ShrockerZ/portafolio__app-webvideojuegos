import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { User } from 'src/app/auth/interface/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Games, Platform } from '../../inteface/game.interface';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  logged:boolean=false;
  user:User|null=null;
  selected:Games|null=null;
  constructor(
    private _router:Router,
    private _store:Store<AppState>,
    private _authService:AuthService,
    private _gameService:GameService,
  ) { }

  ngOnInit(): void {
    this._gameService.getPlatforms();
    this._store.subscribe(
      state=>{
        this.logged=state.session.logged;
        this.user=state.session.user;
        this.selected=state.games.selectedgame;
      }
    );
  }
  searchGame(search:string){
    search=search.trim().toLowerCase().replace(" ","%20");
    this._router.navigate(['/games/library'],{queryParams:{search}});
  }
  logOut(){
    this._authService.logOutUser();
    this._router.navigate(['/games/store']);
  }
  gotoGame(id:number){
    this._router.navigate([`/games/detail/${id}`]);

  }
 
  

}
