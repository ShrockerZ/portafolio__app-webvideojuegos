import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
  game: Games|any;
  loading:boolean=true;
  owlOptions: OwlOptions={
    loop:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['Anterior', 'Siguiente'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  constructor(
    private _activateRoute:ActivatedRoute,
    private _gameService:GameService,
    private _store:Store<AppState>,
    public _userService:UserService  ) { 
    this._activateRoute.params.subscribe(param=>{
      this._gameService.getGameDetail(parseInt(param['id']))}
    );
    this._store.select('games').subscribe(state=>{
      this.game=state.selectedgame;
      this.loading=state.loading;
    })
  }
  ngOnInit(): void {  
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
}
