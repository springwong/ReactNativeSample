import {YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID} from "@env"
import axios from 'axios';
import { Playlist } from "./models/Playlist";
import { PlaylistItems } from "./models/PlaylistItem";

export const playlistFetcher = (url: string) => axios.get<Playlist>("https://www.googleapis.com/youtube/v3/playlists/", {
    params: {
        key: YOUTUBE_API_KEY,
        channelId: YOUTUBE_CHANNEL_ID,
        part: "snippet",
    }
})

export const playlistItemFetcher = (url: string, playlistId: string) => axios.get<PlaylistItems>("https://www.googleapis.com/youtube/v3/playlistItems/", {
    params: {
        key: YOUTUBE_API_KEY,
        playlistId: playlistId,
        part: "snippet",
    }
})

export const playlistItemsFetcher = async (url: string, list: any[]): Promise<any[]> => await Promise.all(
    list.map(item => {
        return axios.get<PlaylistItems>("https://www.googleapis.com/youtube/v3/playlistItems/", {
            params: {
                key: YOUTUBE_API_KEY,
                playlistId: item.id,
                part: "snippet",
            }
        }).then(res => {
            return {
                data: res.data.items,
                title: item.title,
            }
        })
    })
)