import { createAction, props } from "@ngrx/store";
import { Games, Genre, Platform } from "../inteface/game.interface";

// actions
export const getGenres=createAction('GAMES [GET GENRES]',props<{genres:Genre[]}>());
export const getGames=createAction('GAMES [GET GAMES]',props<{games:Games[]}>());
export const scrollGames=createAction('GAMES [SCROLL GAMES]',props<{scroll:Games[]}>());
export const getPopular=createAction('GAMES [GET POPULAR]',props<{games:Games[]}>());
export const getPlatforms=createAction('GAMES [GET PLATFORM]',props<{platforms:Platform[]}>());
export const getGameDetail=createAction('GAMES [GET GAME_DETAIL]',props<{game:Games}>());
export const loading=createAction('GAMES [LOADING]');

