import { View } from "react-native"
import React from 'react';
import useSWR from "swr";
import { playlistFetcher } from "../../apis/youtube";

export const ListScreen = () => {
    const {data, error, isValidating} = useSWR('/api/playlist', playlistFetcher);
    return isValidating ? null : <View>
        
    </View>
}