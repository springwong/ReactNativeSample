import {useNavigation} from '@react-navigation/core';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const [fitlerText, setFitlerText] = useState("")
  return (
    <View style={{
        padding: 8,
        height: '100%',
    }}>
      <TextInput style={{
          borderColor: 'grey',
          borderWidth: 1,
          fontSize: 20,
          padding: 8,
          marginBottom: 16,
      }} editable clearButtonMode="always"
      placeholder="Type to search"
      onChangeText={
          (text: string) => {
            setFitlerText(text)
          }
      }
       />
      <FlatList
      style={{
      }}
        data={data?.items.filter(item => !fitlerText || item.snippet.title.includes(fitlerText))}
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
        }}
      />
    </View>
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
