import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../AppState';
import { AuthService } from '../auth/services/auth.service';
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  logged:boolean=false;
  constructor(private _store:Store<AppState>,
              private _router:Router){
  this._store.select('session').subscribe(
    state=>this.logged=state.logged);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.logged){
        this._router.navigateByUrl("/");
      }
      return this.logged;
  }
  
}
