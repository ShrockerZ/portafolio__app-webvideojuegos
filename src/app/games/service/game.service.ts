import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as action from "../redux/games.actions";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { additionalContent, Games, GamesResult, Genre, Platform, PlatformsResult, Reddit, RedditResult, Video, VideoResult } from '../inteface/game.interface';
import { map } from "rxjs/operators"
import { AppState } from 'src/app/AppState';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private BASE:string;
    private KEY:string;
    public page:number=1;
    
    constructor(private _store:Store<AppState>,
                private _http:HttpClient){
        this.BASE=environment.API_URL;
        this.KEY=environment.API_KEY;
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
                `${this.BASE}/games?genres=${id}&page=${this.page}&${this.KEY}`).pipe(
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
            // dlc & complements
            const additional:additionalContent[]=await this._http.get<GamesResult>(
                `${this.BASE}/games/${id}/additions?${this.KEY}`)
                .pipe(map(result=>result.results)).toPromise();
            game.additionalContent= additional
            // videos & trailer
            const trailers:Video[]=await this._http.get<VideoResult>(
                `${this.BASE}/games/${id}/movies?${this.KEY}`)
                .pipe(map(result=>result.results)).toPromise();
            game.trailers=trailers;
            // reddit
            const reddit:Reddit[]=await this._http.get<RedditResult>(
                `${this.BASE}/games/${id}/reddit?${this.KEY}`)
                .pipe(map(result=>result.results)).toPromise();
            game.redditPosts=reddit;

            this._store.dispatch(action.getGameDetail({game}));
        } catch (error) {
            console.log(error);
        }
    }
    async searchGame(searchterm:string){
        this._store.dispatch(action.loading());
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
    async getPlatforms(){  
        this._store.dispatch(action.loading());
            try {
                const platforms:Platform[]=await this._http.get<PlatformsResult>(
                    `${this.BASE}/platforms?${this.KEY}`).pipe(
                    map(result=>result.results)
                    ).toPromise().then();
                this._store.dispatch(action.getPlatforms({platforms}));
            } catch (error) {
                console.log(error)
            } 
    }
    async getGames(){
        try {
            this._store.dispatch(action.loading());
            const result:Games[]=await this._http.get<GamesResult>(
                `${this.BASE}/games?page=${this.page}&${this.KEY}`).pipe(
                map(result=>result.results)
                ).toPromise().then();
            (this.page===1) ?this._store.dispatch(action.getGames({games:result}))
            : this._store.dispatch(action.scrollGames({scroll:result}));
        } catch (error) {
            console.log(error);
        }

    }
    async getGamesbyTag(tag:number){
        this._store.dispatch(action.loading());
        try {
            const result:Games[]=await this._http.get<GamesResult>(
                `${this.BASE}/games?page=${this.page}&tags=${tag}&${this.KEY}`).pipe(
                map(result=>result.results)
                ).toPromise().then();
            (this.page===1) ?this._store.dispatch(action.getGames({games:result}))
            : this._store.dispatch(action.scrollGames({scroll:result}));
        } catch (error) {
            console.log(error);
        }
    }
    async getGamesbyPLatform(platform:number){
        this._store.dispatch(action.loading());
        try {
            const result:Games[]=await this._http.get<GamesResult>(
                `${this.BASE}/games?page=${this.page}&platforms=${platform}&${this.KEY}`).pipe(
                map(result=>result.results)
                ).toPromise().then();
            (this.page===1) ?this._store.dispatch(action.getGames({games:result}))
            : this._store.dispatch(action.scrollGames({scroll:result}));
        } catch (error) {
            console.log(error);
        }
    }
}