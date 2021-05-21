import { Action, createReducer,on } from "@ngrx/store";
import { AppAuth } from "../interface/AppAuth";
import * as auth from "./auth.actions";

const initialState:AppAuth={
    user:null,
    logged:false,
    loading:false
}
const _authReducer = createReducer(initialState,
    on(auth.loginUser, (state,{user}) => {
        return {...state,
                user,
                loading:false,
                logged:true}}),
    on(auth.logOutUser, state => {
        return {...state,
                user:null,
                loading:false,
                logged:false}}),
    on(auth.loading, state => {
        return {...state,
                loading:true}}),
    on(auth.updateUser,(state,{user})=>{
        return {...state,
                user,
                loading:false}
    })
);

export function Authreducer(state:any,action:Action) {
    return _authReducer(state, action);
}