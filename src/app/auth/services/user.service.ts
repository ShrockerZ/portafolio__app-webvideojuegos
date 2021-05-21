import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/AppState';
import { environment } from 'src/environments/environment';
import { resultHTTP } from '../interface/token.interface';
import { UserGames } from '../interface/user.interface';
import * as action from '../redux/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  SERVER:string;
  headers;
  constructor(
    private _http:HttpClient,
    private _store:Store<AppState>,
    private _toast:ToastrService

  ) { 
    this.SERVER=environment.SERVER;
    this.headers= new HttpHeaders().set('Content-Type', 'application/json');
  }
  async addGame(game:UserGames){
    this.setToken();
    this._store.dispatch(action.loading());
    try {
      const result=await this._http.post<resultHTTP>(`${this.SERVER}/user/owned`,game,{headers:this.headers}).toPromise();
      (result.error===null) ? this._toast.success("Juego Adquirido","Exito") :
      this._toast.error(result.error,"error");
      if(result.error===null) {
        this.updateUser();
      }

    } catch (error) {
      console.log(error)
      this._toast.error(error.error.error,"error");
    }
  
  }
  async removeGame(id:number){
    this.setToken();
    this._store.dispatch(action.loading());
    try {
      const result=await this._http.delete<resultHTTP>(`${this.SERVER}/user/owned/${id}`,{headers:this.headers}).toPromise();
      (result.error===null) ? this._toast.success("Juego Removido","Exito") :
      this._toast.error(result.error,"error");
      if(result.error===null) {
        this.updateUser();
      }
    } catch (error) {
      console.log(error)
      this._toast.error(error.error.error,"error");
    }

  }
  async addWishList(game:UserGames){
    this.setToken();
    this._store.dispatch(action.loading());
    try {
      const result=await this._http.post<resultHTTP>(`${this.SERVER}/user/wishlist`,game,{headers:this.headers}).toPromise();
      if(result.error===null){ 
        this._toast.success("Agregado  Lista de deseos","Exito") 
        this.updateUser();
      }
    } catch (error) {
      console.log(error)
      this._toast.error(error.error.error,"error");
    }
  }
  async removeWishlist(id:number){
    this.setToken();
    this._store.dispatch(action.loading());
    try {
      const result=await this._http.delete<resultHTTP>(`${this.SERVER}/user/wishlist/${id}`,{headers:this.headers}).toPromise();
      if(result.error===null){ 
        this._toast.success("Removido lista de Deseos","Exito") 
        this.updateUser();
      }
    } catch (error) {
      console.log(error)
      this._toast.error(error.error.error,"error");
    }
  }
  async updateUser(){
    this.setToken();
    try {
      const result=await this._http.get<resultHTTP>(`${this.SERVER}/user`,{headers:this.headers}).toPromise();
      if(result.error) this._toast.error(result.error,"error");
      if(result.data){
        this._store.dispatch(action.updateUser({user:result.data}));
      }  
    } catch (error) {
      console.log(error);
      this._toast.error(error.error.error,"error");
    }
  }
  setToken(){
    const token:string|null=localStorage.getItem('token');
    if(token){
      this.headers= new HttpHeaders().set('x-auth-token',JSON.parse(token));
    }
  }

}

