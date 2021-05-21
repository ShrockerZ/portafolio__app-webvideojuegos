import { User } from "./user.interface";

export interface AppAuth{
    user:User | null,
    logged:boolean,
    loading:boolean,
}