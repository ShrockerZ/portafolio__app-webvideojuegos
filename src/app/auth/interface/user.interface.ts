export interface User{
    user:string,
    password:string,
    name?:string,
    email?:string,
    phrase?:string,
    owned?:UserGames[],
    wishlist?:UserGames[]
}

export interface UserGames{
    id:number,
    name:string,
    slug:string,
    background_image:string,
    metacritic:number
}