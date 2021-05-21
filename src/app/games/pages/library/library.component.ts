import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppState } from 'src/app/AppState';
import { User, UserGames } from 'src/app/auth/interface/user.interface';
import { UserService } from 'src/app/auth/services/user.service';
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
  user:User|null=null;

  constructor(
    private _activatedRoute:ActivatedRoute,
    public  _gameService:GameService,
    private _userService:UserService,
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
    this._store.subscribe(
      state=>{
        this.games=state.games.games
        this.loading=state.games.loading
        this.user=state.session.user && null});
  }
  ngOnDestroy(){
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
  inWishListed(gameId:number):boolean{
    if(this.user!==null){
      const result=this.user.wishlist.some(wish=>wish.id===gameId) 
      return (!result)? false : true;
    }else{
      return false
    }
  }

}
