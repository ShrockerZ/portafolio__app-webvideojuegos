import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { UserGames } from 'src/app/auth/interface/user.interface';
import { Games } from '../../inteface/game.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  userGames:any | UserGames[];
  constructor(
    private _store:Store<AppState>,
  ) { }

  ngOnInit(): void {
    this._store.select('session').subscribe(
      state=>this.userGames=state.user?.owned
    );
  }

}