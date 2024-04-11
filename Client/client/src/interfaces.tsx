export interface SpotifyImage {
    url: string,
    height: number,
    width: number,
}

export interface Artist {
    external_urls: any,
    followers: any,
    genres: any,
    href: string,
    id: string,
    images?: SpotifyImage,
    name: string,
    popularity: number,
    type: string,
    uri: string,
}

export interface Album {
    album_type: string,
    artists: [Artist],
    available_markets: [string],
    external_urls: any,
    href: string,
    id: string,
    images: [SpotifyImage],
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string,
    uri: string,
}

export interface SpotifySong {
    user: string,
    uri: string,
    name: string,
    artists: [Artist],
    album: Album,
    release_date: string,
    duration_ms: number
    type: string,
    trash?: boolean,
    chill?: boolean,
}
