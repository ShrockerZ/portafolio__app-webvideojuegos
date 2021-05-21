import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppGames } from '../inteface/AppGames';
import * as action from "../redux/games.actions";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Games, GamesResult, Genre } from '../inteface/game.interface';
import { map } from "rxjs/operators"
import { AppState } from 'src/app/AppState';


@Injectable({
    providedIn: 'root'
})
export class GameService {
    private BASE:string;
    private KEY:string;
    loading:boolean;
    constructor(private _store:Store<AppState>,
                private _http:HttpClient){
        this.BASE=environment.API_URL;
        this.KEY=environment.API_KEY;
        this.loading=false;
    }

    async getGenres(){
        try {
            const genres:Genre[]=await this._http.get<GamesResult>(
                `${this.BASE}/genres?${this.KEY}`).pipe(
                map(result=>result.results)
                ).toPromise().then();
            this._store.dispatch(action.getGenres({genres}));
        } catch (error) {
            console.log(error)
        }        
    }
    
    async getGamesByGenres(id:number){
        this._store.dispatch(action.loading());
        try {
            const games:Games[]=await this._http.get<GamesResult>(
                `${this.BASE}/games?genres=${id}&page_size=10&${this.KEY}`).pipe(
                map(result=>result.results)
                ).toPromise().then();
            this._store.dispatch(action.getGames({games}));
        } catch (error) {
            console.log(error)
        }

    }
    async getGameDetail(id:number){
        this._store.dispatch(action.loading());
        try {
            const game:Games=await this._http.get<GamesResult>(
                `${this.BASE}/games/${id}?${this.KEY}`).toPromise().then();
            this._store.dispatch(action.getGameDetail({game}));
        } catch (error) {
            console.log(error);
        }
    }
    async searchGame(searchterm:string){
        this._store.dispatch(action.loading());
        console.log(searchterm);
        try {
            const games:Games[]=await this._http.get<GamesResult>(
                `${this.BASE}/games?search=${searchterm}&${this.KEY}`).pipe(
                map(result=>result.results)
                ).toPromise().then();
            this._store.dispatch(action.getGames({games}));
        } catch (error) {
            console.log(error)
        }

    }
    async popularGames(){  
        this._store.dispatch(action.loading());
            try {
                const games:Games[]=await this._http.get<GamesResult>(
                    `${this.BASE}/games?metacritic=100&page_size=5&${this.KEY}`).pipe(
                    map(result=>result.results)
                    ).toPromise().then();
                    this._store.dispatch(action.getPopular({games}));
            } catch (error) {
                console.log(error)
            } 
    }
    async getGames(){
        this._store.dispatch(action.loading());
        try {
            const games:Games[]=await this._http.get<GamesResult>(
                `${this.BASE}/games?page_size=10&ordering=released&${this.KEY}`).pipe(
                map(result=>result.results)
                ).toPromise().then();
            this._store.dispatch(action.getGames({games}));
        } catch (error) {
            console.log(error);
        }

    }
}