import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import useSWR from 'swr';
import {playlistFetcher, playlistItemFetcher} from '../../apis/youtube';
import {Item} from '../../apis/models/Playlist';
import {PlaylistItem} from '../../apis/models/PlaylistItem';

const GridItem = ({index, item}: {index: number; item: PlaylistItem}) => {
  return (
    <View style={{
        width: 160,
        marginLeft: index === 0 ? 0 : 16,
    }}>
      <Image style={{
          width: 160,
          height: 90,
          borderRadius: 6,
      }} source={{
          uri: item.snippet.thumbnails.medium.url,
      }}></Image>
      <Text numberOfLines={3} style={{
          color: 'grey',
          textAlign: 'center',
      }}>{item.snippet.title}</Text>
    </View>
  );
};
const MovieGrid = (item: Item) => {
  const {data, error, isValidating} = useSWR(
    ['/api/playlistItem', item.id],
    playlistItemFetcher,
  );
  return (
    <View style={{
        marginTop: 16,
        paddingHorizontal: 8,
    }}>
      <Text style={{
          marginBottom: 8,
          color: 'grey',
      }}>{item.snippet.title}</Text>
      {data ? (
        <FlatList
          horizontal={true}
          data={data?.data.items}
          renderItem={GridItem}
        />
      ) : null}
    </View>
  );
};

export const GridScreen = () => {
  const {data, error, isValidating} = useSWR('/api/playlist', playlistFetcher);
  return isValidating ? null : (
    <ScrollView>
      {data?.data.items.map(item => {
        return <MovieGrid {...item} />;
      })}
    </ScrollView>
  );
};
