import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { Platform } from '../../inteface/game.interface';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-sidebar-platform',
  templateUrl: './sidebar-platform.component.html',
  styleUrls: ['./sidebar-platform.component.scss']
})
export class SidebarPlatformComponent implements OnInit {
  platforms:Platform[]|null=null;
  constructor(
    private _store:Store<AppState>,
    private _router:Router,
    private _gameService:GameService
      ) {
    this._store.select('games').subscribe(state=>{
      this.platforms=state.platforms.slice(0,13);
    });
   }

  ngOnInit(): void {}
  
  gotoPlatform(platform:number){
    this._gameService.page=1;
    this._router.navigate(['/games/library'],{queryParams:{platform}});
  }


}
