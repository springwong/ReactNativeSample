// To parse this data:
//
//   import { Convert, Videos } from "./file";
//
//   const videos = Convert.toVideos(json);

export interface Videos {
    kind:     string;
    etag:     string;
    items:    VideoItem[];
    pageInfo: PageInfo;
}

export interface VideoItem {
    kind:    string;
    etag:    string;
    id:      string;
    snippet: Snippet;
}

export interface Snippet {
    publishedAt:          Date;
    channelId:            string;
    title:                string;
    description:          string;
    thumbnails:           Thumbnails;
    channelTitle:         string;
    tags:                 string[];
    categoryId:           string;
    liveBroadcastContent: string;
    localized:            Localized;
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
    public static toVideos(json: string): Videos {
        return JSON.parse(json);
    }

    public static videosToJson(value: Videos): string {
        return JSON.stringify(value);
    }
}
