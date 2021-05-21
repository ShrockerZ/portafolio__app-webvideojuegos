import { createAction, props } from "@ngrx/store";
import { Games, Genre } from "../inteface/game.interface";

// actions
export const getGenres=createAction('GAMES [GET GENRES]',props<{genres:Genre[]}>());
export const getGames=createAction('GAMES [GET GAMES]',props<{games:Games[]}>());
export const getPopular=createAction('GAMES [GET POPULAR]',props<{games:Games[]}>());
export const getGameDetail=createAction('GAMES [GET GAME_DETAIL]',props<{game:Games}>());
export const loading=createAction('GAMES [LOADING]');

