import { Action, createReducer, on } from "@ngrx/store";
import { AppGames } from "../inteface/AppGames";
import * as games from "./games.actions";


const initialState:AppGames={ 
    games:[],
    populargames:[],
    platforms:[],
    genres:[],
    selectedgame:null,
    loading:false,
}
const _GamesReducer= createReducer(initialState,
        on(games.loading,state=>{
            return {...state,loading:true}
        }),
        on(games.getGames,(state,{games})=>{
            return {...state,
                    games,
                    loading:false,
                    selectedgame:null}
        }),
        on(games.getPopular,(state,{games})=>{
            return {...state,
                    loading:false,
                    selectedgame:null,
                    populargames:games}
        }),
        on(games.getPlatforms,(state,{platforms})=>{
            return {
                    ...state,
                    platforms,
                    loading:false,
                    selectedgame:null,
            }
        }),
        on(games.getGenres,(state,{genres})=>{
            return {...state,
                    genres,
                    games:[],
                    loading:false,
                    selectedgame:null }
        }),
        on(games.getGameDetail,(state,{game})=>{
            return {...state,
                    loading:false,
                    selectedgame:game}
        }),
        on(games.scrollGames,(state,{scroll})=>{
            return {...state,
                    loading:false,
                    games:[...state.games,...scroll],
                    selectedgame:null
            }
        }));
        
export function GamesReducer(state:any,action:Action){
    return _GamesReducer(state,action)
}