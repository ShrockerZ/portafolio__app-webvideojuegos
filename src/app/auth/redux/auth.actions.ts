import { createAction } from "@ngrx/store";

export const loading = createAction('[USER] LOADING');
export const registerUser = createAction('[USER] REGISTER');
export const loginUser = createAction('[USER] LOGIN');
export const addGames = createAction(' [USER] BUY GAMES');
export const removeGames = createAction('[USER] DELETE GAMES');
export const addWishList = createAction('[USER] ADD WISHLIST');
export const removeWishList = createAction('[USER] REMOVE WISHLITS');