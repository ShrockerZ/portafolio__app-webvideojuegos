import { User } from "./user.interface";

export interface resultHTTP{
    token?:string,
    error?:string,
    data?:User
}