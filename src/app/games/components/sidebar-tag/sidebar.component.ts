import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { Games} from '../../inteface/game.interface'
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-sidebar-tags',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selected:Games| null;
  constructor(
    private _store:Store<AppState>,
    private _router:Router,
    private _gameService:GameService
  ) {}
  ngOnInit(): void {
    this._store.select('games').subscribe(state=>{
      this.selected=state.selectedgame
    });
  }
  gotoTag(tag:number){
    this._gameService.page=1;
    this._router.navigate(['/games/library'],{queryParams:{tag}});
  }

}
