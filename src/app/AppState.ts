import { AppAuth } from "./auth/interface/AppAuth";
import { AppGames } from "./games/inteface/AppGames";


export interface AppState{
    games:AppGames,
    session:AppAuth
}