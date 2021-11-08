// To parse this data:
//
//   import { Convert, PlaylistItem } from "./file";
//
//   const playlistItem = Convert.toPlaylistItem(json);

export interface PlaylistItems {
    kind:     string;
    etag:     string;
    items:    PlaylistItem[];
    pageInfo: PageInfo;
}

export interface PlaylistItem {
    kind:    string;
    etag:    string;
    id:      string;
    snippet: Snippet;
}

export interface Snippet {
    publishedAt:            Date;
    channelId:              string;
    title:                  string;
    description:            string;
    thumbnails:             Thumbnails;
    channelTitle:           string;
    playlistId:             string;
    position:               number;
    resourceId:             ResourceId;
    videoOwnerChannelTitle: string;
    videoOwnerChannelId:    string;
}

export interface ResourceId {
    kind:    string;
    videoId: string;
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
    public static toPlaylistItem(json: string): PlaylistItem {
        return JSON.parse(json);
    }

    public static playlistItemToJson(value: PlaylistItem): string {
        return JSON.stringify(value);
    }
}
