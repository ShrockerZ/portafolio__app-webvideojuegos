import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { User } from 'src/app/auth/interface/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  logged:boolean=false;
  user:User|null=null;
  constructor(
    private _router:Router,
    private _store:Store<AppState>,
    private _authService:AuthService
  ) { }

  ngOnInit(): void {
    this._store.select('session').subscribe(
      state=>{
        this.logged=state.logged;
        this.user=state.user;
      }
    );
  }
  searchGame(search:string){
    search=search.trim().toLowerCase()
    this._router.navigate(['/games/library'],{queryParams:{search}});
  }
  logOut(){
    this._authService.logOutUser();
  }
  gotoGame(id:number){
    this._router.navigate([`/games/detail/${id}`]);

  }

  

}
