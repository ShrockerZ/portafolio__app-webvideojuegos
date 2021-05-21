import { createAction, props } from "@ngrx/store";
import { User, UserGames } from "../interface/user.interface";

export const loading = createAction('USER [LOADING]');
export const logOutUser = createAction('USER [LOGOUT]');
export const loginUser = createAction('USER [LOGIN]',props<{user:User}>());
export const updateUser = createAction(' USER [UPDATE USER]',props<{user:User}>());