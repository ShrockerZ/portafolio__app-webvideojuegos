import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit,HostListener, Inject } from '@angular/core';
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
  loading:boolean=       true;
  games:Games[]=         [];
  user:User|null=        null;
  showButton:boolean=    false;
  SCROLL_HEIGHT:number=  100;
  actualPage:number=     1;
  // query params
  genre;
  search;
  tag;
  platform;
  

  constructor(
    private _activatedRoute:ActivatedRoute,
    public  _gameService:GameService,
    public  _userService:UserService,
    private _store:Store<AppState>,
    private spinner: NgxSpinnerService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this._activatedRoute.queryParams.subscribe(params=>{
      this.genre=params['genre'];
      this.search=params['search'];
      this.tag=params['tag'];
      this.platform=params['platform'];
      // resete page
      this.actualPage=1;
      this.generateGames();
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
  @HostListener('window:scroll')
  onScroll(){
    const yOffset=window.pageYOffset;
    const scrollTop=this.document.documentElement.scrollTop;
    this.showButton= (yOffset || scrollTop) >this.SCROLL_HEIGHT;
  }

  scrolltoTop(){
    this.document.documentElement.scrollTop=0;
    this._gameService.page=1;
    this.generateGames();
  }

  onScrollDown(){
    this._gameService.page+=1;
    this.generateGames();
  }
  generateGames(){
    if (this.tag)        this._gameService.getGamesbyTag(this.tag);
    if (this.search)     this._gameService.searchGame(this.search);
    if (this.genre)      this._gameService.getGamesByGenres(this.genre);
    if (this.platform)   this._gameService.getGamesbyPLatform(this.platform);
    if (!this.search && !this.genre && !this.tag && !this.platform) this._gameService.getGames();
  }

}
