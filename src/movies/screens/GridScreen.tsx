import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useSWR from 'swr';
import {playlistFetcher, playlistItemFetcher} from '../../apis/youtube';
import {Item} from '../../apis/models/Playlist';
import {PlaylistItem} from '../../apis/models/PlaylistItem';
import {useNavigation} from '@react-navigation/native';

const MovieGrid = (item: Item) => {
  const navigation = useNavigation();
  const {data, error, isValidating} = useSWR(
    ['/api/playlistItem', item.id],
    playlistItemFetcher,
  );

  const GridItem = ({index, item}: {index: number; item: PlaylistItem}) => {
    return (
      <TouchableOpacity
        style={{
          width: 160,
          marginLeft: index === 0 ? 0 : 16,
        }}
        onPress={() => {
          navigation.navigate('Detail', {
              ...item,
          });
        }}>
        <Image
          style={{
            width: 160,
            height: 90,
            borderRadius: 6,
          }}
          source={{
            uri: item.snippet.thumbnails.medium.url,
          }}></Image>
        <Text
          numberOfLines={3}
          style={{
            color: 'grey',
            textAlign: 'center',
          }}>
          {item.snippet.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginTop: 16,
        paddingHorizontal: 8,
      }}>
      <Text
        style={{
          marginBottom: 8,
          color: 'grey',
        }}>
        {item.snippet.title}
      </Text>
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
