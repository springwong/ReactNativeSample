import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import useSWR from 'swr';
import {VideoItem} from '../../apis/models/Video';
import {videosFetcher} from '../../apis/youtube';
import {RootState} from '../../store/store';

const FavList = (item: any) => {
    const navigation = useNavigation();
  const {data, error, isValidating} = useSWR(
    ['/api/videos', item.likes],
    videosFetcher,
  );
  return (
    <FlatList
      data={data?.items}
      renderItem={({item, index}: {item: VideoItem; index: number}) => {
        return (
          <TouchableOpacity
            onPress={() => {
                navigation.navigate('Detail', {
                  ...item,
                  videoId: item.id,
                });
            }}
            style={{
              paddingHorizontal: 16,
              alignItems: 'center',
              marginTop: index === 0 ? 0 : 16,
            }}>
            <Image
              style={{
                width: '100%',
                aspectRatio: 16 / 5,
                borderRadius: 6,
              }}
              source={{
                uri: item.snippet.thumbnails.high.url,
              }}
            />
            <Text
              style={{
                marginTop: 4,
                color: 'grey',
              }}>
              {item.snippet.title}
            </Text>
          </TouchableOpacity>
        );
      }}></FlatList>
  );
};
export const FavScreen = () => {
  const likes = useSelector((state: RootState) => state.fav.likes);
  return likes && likes.length > 0 ? (
    <FavList
      {...{
        likes: likes,
      }}
    />
  ) : null;
};
