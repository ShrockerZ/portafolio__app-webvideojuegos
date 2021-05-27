import { Games, Genre, Platform } from "./game.interface";

export interface AppGames{
    games:Games[],
    genres:Genre[],
    selectedgame:Games |null,
    populargames:Games[],
    platforms:Platform[]
    loading:boolean
}