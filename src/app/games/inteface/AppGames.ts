import { Games, Genre } from "./game.interface";

export interface AppGames{
    games:Games[],
    genres:Genre[],
    selectedgame:Games |null,
    populargames:Games[],
    loading:boolean
}