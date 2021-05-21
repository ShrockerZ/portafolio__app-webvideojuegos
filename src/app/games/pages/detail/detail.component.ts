import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
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
    private _store:Store<AppState>  ) { 
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
  buyGames(id:number){
  }
  addFavorite(id:number){
  }
  removeFavorite(id:number){
    
  }

}
