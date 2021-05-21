import { Action, createReducer,on } from "@ngrx/store";
import { AppAuth } from "../interface/AppAuth";
import * as auth from "./auth.actions";

const initialState:AppAuth={
    user:null,
    logged:false,
    loading:false
}
const _authReducer = createReducer(initialState,
    on(auth.loginUser, state => state),
    on(auth.registerUser, state => state),
    on(auth.addGames, state => state),
    on(auth.removeGames, state => state),
    on(auth.addWishList, state => state),
    on(auth.removeWishList, state => state),
);

export function Authreducer(state:AppAuth,action:Action) {
    return _authReducer(state, action);
}