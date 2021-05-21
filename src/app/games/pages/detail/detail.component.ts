import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { UserGames } from 'src/app/auth/interface/user.interface';
import { UserService } from 'src/app/auth/services/user.service';
import { Games } from '../../inteface/game.interface';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  game:any | Games;
  loading:boolean=true;
  constructor(
    private _activateRoute:ActivatedRoute,
    private _gameService:GameService,
    private _store:Store<AppState>,
    private _userService:UserService  ) { 
    this._activateRoute.params.subscribe(param=>{
      this._gameService.getGameDetail(parseInt(param['id']))}
    );
  }
  ngOnInit(): void {  
    this._store.select('games').subscribe(state=>{
      this.game=state.selectedgame;
      this.loading=state.loading;
    })
  }
  buyGame(game:Games){
    const userGame:UserGames={
      id:game.id,
      name:game.name,
      slug:game.slug,
      background_image:game.background_image,
      metacritic:game.metacritic,
    }
    this._userService.addGame(userGame);
  }
  addWishList(game:Games){
    const userGame:UserGames={
      id:game.id,
      name:game.name,
      slug:game.slug,
      background_image:game.background_image,
      metacritic:game.metacritic,
    }
    this._userService.addWishList(userGame);
  }
  removeWishList(id:number){
    this._userService.removeWishlist(id);
  }
  returnGame(id:number){
    this._userService.removeGame(id);
  }
}
