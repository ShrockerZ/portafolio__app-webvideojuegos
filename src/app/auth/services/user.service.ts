import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/AppState';
import { environment } from 'src/environments/environment';
import { resultHTTP } from '../interface/token.interface';
import { User, UserGames } from '../interface/user.interface';
import * as action from '../redux/auth.actions';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  SERVER:string;
  user:User|null;
  headers:HttpHeaders= new HttpHeaders();
  constructor(
    private _http:HttpClient,
    private _store:Store<AppState>,
    private _toast:ToastrService,
    private _authService:AuthService,
  ) { 
    this.SERVER=environment.SERVER;
    this.headers=this._authService.headers;
    this._store.select('session').subscribe(
      state=>this.user=state.user
    );
  }

  async addWishList(game:UserGames){
    this.setHeaders();
    this._store.dispatch(action.loading());
    try {
      const result=await this._http.post<resultHTTP>(`${this.SERVER}/user/wishlist`,game,{headers:this.headers}).toPromise();
      if(result.error===null){ 
        this._toast.success("Agregado  Lista de deseos","Exito") 
        this.getUserData();
      }
    } catch (error) {
      console.log(error)
      this._store.dispatch(action.error());
      this._toast.error(error.error.error,"error");
    }
  }
  async removeWishlist(id:number){
    this.setHeaders();
    this._store.dispatch(action.loading());
    try {
      const result=await this._http.delete<resultHTTP>(`${this.SERVER}/user/wishlist/${id}`,{headers:this.headers}).toPromise();
      if(result.error===null){ 
        this._toast.success("Removido lista de Deseos","Exito") 
        this.getUserData();
      }
    } catch (error) {
      console.log(error)
      this._store.dispatch(action.error());
      this._toast.error(error.error.error,"error");
    }
  }
  async getUserData(){
    this.setHeaders();
    try {
      const result=await this._http.get<resultHTTP>(`${this.SERVER}/user`,{headers:this.headers}).toPromise();
      if(result.error) this._toast.error(result.error,"error");
      if(result.data){
        this._store.dispatch(action.updateUser({user:result.data}));
      }  
    } catch (error) {
      console.log(error);
      this._store.dispatch(action.error());
      this._toast.error(error.error.error,"error");
    }
  }
  setHeaders(){
    this.headers=this._authService.headers;
  }
  inWishListed(gameId:number):boolean{
    if(this.user){
      const result=this.user.wishlist.some(wish=>wish.id===gameId) 
      return (!result)? false : true;
    }else{
      return false
    }
  }
  async updateUser(user:User){
    this.setHeaders();
    try {
      this._store.dispatch(action.loading());
      await this._http.put(`${this.SERVER}/user`,user,{headers:this.headers}).toPromise().then();
      await this._authService.loginUser(user);
    } catch (error) {
      this._store.dispatch(action.error());
      this._toast.error(error.error.error,"error");
    }

  }

}

