export interface GamesResult {
    count:                number;
    next:                 string;
    previous:             null;
    results:              Games[]|additionalContent[]| null;
    seo_title:            string;
    seo_description:      string;
    seo_keywords:         string;
    seo_h1:               string;
    noindex:              boolean;
    nofollow:             boolean;
    description:          string;
    filters:              Filters;
    nofollow_collections: string[];
}

export interface Filters {
    years: FiltersYear[];
}

export interface FiltersYear {
    from:     number;
    to:       number;
    filter:   string;
    decade:   number;
    years:    YearYear[];
    nofollow: boolean;
    count:    number;
}

export interface YearYear {
    year:     number;
    count:    number;
    nofollow: boolean;
}

export interface Games {
    id:                 number;
    slug:               string;
    name:               string;
    released:           Date;
    tba:                boolean;
    background_image:   string;
    rating:             number;
    rating_top:         number;
    ratings:            Rating[];
    ratings_count:      number;
    reviews_text_count: number;
    added:              number;
    added_by_status:    AddedByStatus;
    metacritic:         number;
    playtime:           number;
    suggestions_count:  number;
    updated:            Date;
    user_game:          null;
    reviews_count:      number;
    saturated_color:    string;
    dominant_color:     string;
    platforms:          PlatformElement[];
    parent_platforms:   ParentPlatform[];
    genres:             Genre[];
    stores:             Store[];
    clip:               null;
    tags:               Genre[];
    esrb_rating:        EsrbRating | null;
    short_screenshots:  ShortScreenshot[];
    additionalContent?: additionalContent[];
    trailers?:          Video[];
    redditPosts?:       Reddit[];
}
export interface additionalContent {
    id:                 number;
    slug:               string;
    name:               string;
    released:           Date;
    tba:                boolean;
    background_image:   string;
    rating:             number;
    rating_top:         number;
    ratings:            Rating[];
    ratings_count:      number;
    reviews_text_count: number;
    added:              number;
    added_by_status:    AddedByStatus;
    metacritic:         number;
    playtime:           number;
    suggestions_count:  number;
    updated:            Date;
    user_game:          null;
    reviews_count:      number;
    saturated_color:    string;
    dominant_color:     string;
    platforms:          PlatformElement[];
    parent_platforms:   ParentPlatform[];
    genres:             Genre[];
    stores:             Store[];
    clip:               null;
    tags:               Genre[];
    esrb_rating:        EsrbRating | null;
    short_screenshots:  ShortScreenshot[];
}


export interface AddedByStatus {
    yet:     number;
    owned:   number;
    beaten:  number;
    toplay:  number;
    dropped: number;
    playing: number;
}

export interface EsrbRating {
    id:   number;
    name: string;
    slug: string;
}

export interface Genre {
    id:               number;
    name:             string;
    slug:             string;
    games_count:      number;
    image_background: string;
    domain?:          Domain;
    language?:        Language;
    games?:           ShortGame[]
}

export enum Domain {
    AppsAppleCOM = "apps.apple.com",
    EpicgamesCOM = "epicgames.com",
    GogCOM = "gog.com",
    MarketplaceXboxCOM = "marketplace.xbox.com",
    MicrosoftCOM = "microsoft.com",
    NintendoCOM = "nintendo.com",
    PlayGoogleCOM = "play.google.com",
    StorePlaystationCOM = "store.playstation.com",
    StoreSteampoweredCOM = "store.steampowered.com",
}

export enum Language {
    Eng = "eng",
}

export interface ParentPlatform {
    platform: EsrbRating;
}

export interface PlatformElement {
    platform:        PlatformPlatform;
    released_at:     Date;
    requirements_en: Requirements | null;
    requirements_ru: Requirements | null;
}

export interface PlatformPlatform {
    id:               number;
    name:             string;
    slug:             string;
    image:            null;
    year_end:         null;
    year_start:       number | null;
    games_count:      number;
    image_background: string;
}

export interface Requirements {
    minimum:      string;
    recommended?: string;
}

export interface Rating {
    id:      number;
    title:   Title;
    count:   number;
    percent: number;
}

export enum Title {
    Exceptional = "exceptional",
    Meh = "meh",
    Recommended = "recommended",
    Skip = "skip",
}

export interface ShortScreenshot {
    id:    number;
    image: string;
}
export interface Store {
    id:               number;
    name:             string;
    slug:             string;
    domain:           string;
    games_count:      number;
    image_background: string;
}

export interface ShortGame {
    id:    number;
    slug:  string;
    name:  string;
    added: number;
}


// video 
export interface VideoResult {
    count:    number;
    next:     null;
    previous: null;
    results:  Video[];
}

export interface Video {
    id:      number;
    name:    string;
    preview: string;
    data:    Data;
}

export interface Data {
    "480": string;
    max:   string;
}
// reddit
export interface RedditResult {
    count:    number;
    next:     string;
    previous: null;
    results:  Reddit[];
}

export interface Reddit {
    id:           number;
    name:         string;
    text:         string;
    image:        null | string;
    url:          string;
    username:     string;
    username_url: string;
    created:      Date;
}


// platforms
export interface PlatformsResult {
    count:    number;
    next:     string;
    previous: null;
    results:  Platform[];
}

export interface Platform {
    id:               number;
    name:             string;
    slug:             string;
    games_count:      number;
    image_background: null | string;
    image:            null;
    year_start:       number | null;
    year_end:         null;
    games:            ShortGame[];
}
