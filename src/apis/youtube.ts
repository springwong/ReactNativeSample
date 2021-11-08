import {YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID} from "@env"
import axios from 'axios';
import { Playlist } from "./models/Playlist";

export const playlistFetcher = (url: string) => axios.get<Playlist>("https://www.googleapis.com/youtube/v3/playlists/", {
    params: {
        key: YOUTUBE_API_KEY,
        channelId: YOUTUBE_CHANNEL_ID,
        part: "snippet",
    }
})

export const playlistItemFetcher = (url: string, playlistId: string) => axios.get<Playlist>("https://www.googleapis.com/youtube/v3/playlistItems/", {
    params: {
        key: YOUTUBE_API_KEY,
        playlistId: playlistId,
        part: "snippet",
    }
})