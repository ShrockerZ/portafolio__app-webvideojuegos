import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/AppState';
import { environment } from 'src/environments/environment';
import { resultHTTP } from '../interface/token.interface';
import { User } from '../interface/user.interface';
import * as action from '../redux/auth.actions'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  SERVER:string;
  headers:HttpHeaders;

  constructor(
    private _http:HttpClient,
    private _store:Store<AppState>,
    private _toast:ToastrService,
    private _router:Router
  ) { 
    this.SERVER=environment.SERVER;
    this.headers= new HttpHeaders().set('Content-Type','application/json');
  }
  async registerUser(user:User){
      try {
        const result=await this._http.post<resultHTTP>(`${this.SERVER}/auth/register`,user,{headers:this.headers}).toPromise();
        if(result.error){
          this._toast.error(result.error,"error") 
          return;
        } 
        this._toast.info("Registro creado ahora puedes iniciar Sesion!!","info");
        this._router.navigateByUrl("/auth/login");        
      } catch (error) {
        console.log(error)
      }
  }
  async loginUser(user:User){
    try {
      const result=await this._http.post<resultHTTP>(`${this.SERVER}/auth/login`,user,{headers:this.headers}).toPromise();
      if(result.error) this._toast.error(result.error,"error");
      if(result.token){
        localStorage.setItem('token',JSON.stringify(result.token));
        this.getUser(result.token);
        this._router.navigate(['/']);
      } } 
      catch (error) {
        console.log(error)
      }
  }
  logOutUser(){
    this.headers= new HttpHeaders().set('Content-Type','application/json');
    localStorage.removeItem('token');
    this._store.dispatch(action.logOutUser());
  }


  
  async getUser(token:string){
    this.headers= new HttpHeaders()
                    .set('Content-Type','application/json')
                    .set('x-auth-token',token);
    const result=await this._http.get<resultHTTP>(`${this.SERVER}/user`,{headers:this.headers}).toPromise();
    if(result.error) this._toast.error(result.error,"error");
    if(result.data){
      this._store.dispatch(action.loginUser({user:result['data']}));
    }    
  }
}


