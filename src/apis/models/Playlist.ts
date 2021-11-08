// To parse this data:
//
//   import { Convert, Playlist } from "./file";
//
//   const playlist = Convert.toPlaylist(json);

export interface Playlist {
    kind:          string;
    etag:          string;
    nextPageToken: string;
    pageInfo:      PageInfo;
    items:         Item[];
}

export interface Item {
    kind:    string;
    etag:    string;
    id:      string;
    snippet: Snippet;
}

export interface Snippet {
    publishedAt:  Date;
    channelId:    string;
    title:        string;
    description:  string;
    thumbnails:   Thumbnails;
    channelTitle: string;
    localized:    Localized;
}

export interface Localized {
    title:       string;
    description: string;
}

export interface Thumbnails {
    default:  Default;
    medium:   Default;
    high:     Default;
    standard: Default;
    maxres:   Default;
}

export interface Default {
    url:    string;
    width:  number;
    height: number;
}

export interface PageInfo {
    totalResults:   number;
    resultsPerPage: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toPlaylist(json: string): Playlist {
        return JSON.parse(json);
    }

    public static playlistToJson(value: Playlist): string {
        return JSON.stringify(value);
    }
}
