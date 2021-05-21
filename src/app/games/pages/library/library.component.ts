import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppState } from 'src/app/AppState';
import { Games } from '../../inteface/game.interface';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit,OnDestroy {
  loading:boolean=true;
  games:Games[]=[];

  constructor(
    private _activatedRoute:ActivatedRoute,
    public  _gameService:GameService,
    private _store:Store<AppState>,
    private spinner: NgxSpinnerService
  ) {
  }
  ngOnInit(): void {
    this.spinner.show()
    this._activatedRoute.queryParams.subscribe(params=>{
      const genre=params['genre'];
      const search=params['search'];
      if (search) this._gameService.searchGame(search);
      if (genre) this._gameService.getGamesByGenres(genre);
      if (!search && !genre) this._gameService.getGames();
    });
    this._store.select('games').subscribe(
      state=>{
        this.games=state.games
        this.loading=state.loading});
  }
  ngOnDestroy(){
  }
  addFavorite(id:number){
    
  }
  removeFavorite(id:number){

  }

}
