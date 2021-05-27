import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OwlOptions, } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/AppState';
import { Games, Genre } from '../../inteface/game.interface';
import { GameService } from '../../service/game.service';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  genres:Genre[]=[];
  popularGames:Games[]=[];
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
      private _store:Store<AppState>,
      public  _gamesService:GameService,
      private _route:Router,
      private _ngxSpinner:NgxSpinnerService,
      ) { 
        this._ngxSpinner.show();
        // asigtare el store 
        if(this.genres.length===0 && this.popularGames.length===0){
          this._gamesService.getGenres();
          this._gamesService.popularGames();
        }
        this._store.select('games').subscribe(
          state=>{
            this.genres=state.genres;
            this.popularGames=state.populargames;
            this.loading=state.loading;
          }
        );
      }
  ngOnInit(): void {
  }
  goToLibrary(genre:number){  
      this._gamesService.page=1;
      this._route.navigate(['/games/library'],{queryParams:{genre}});
  }

}
