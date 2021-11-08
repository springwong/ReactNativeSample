import {YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID} from "@env"
import axios from 'axios';

export const playlistFetcher = (url: string) => axios.get("https://www.googleapis.com/youtube/v3/playlists/", {
    params: {
        key: YOUTUBE_API_KEY,
        channelId: YOUTUBE_CHANNEL_ID,
        part: "snippet",
    }
})