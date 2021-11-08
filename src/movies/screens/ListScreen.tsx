import {
  FlatList,
  Image,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useSWR from 'swr';
import {
  playlistFetcher,
  playlistItemFetcher,
  playlistItemsFetcher,
} from '../../apis/youtube';
import {useNavigation} from '@react-navigation/native';
import {PlaylistItem} from '../../apis/models/PlaylistItem';

export const ListData = (item: any) => {
  const navigation = useNavigation();
  const {data, error, isValidating} = useSWR(
    ['/api/playlistItems', item.dataSet],
    playlistItemsFetcher,
  );
  return !data ? null : (
    <SectionList
      sections={data}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({section: {title}}) => (
        <Text
          style={{
            color: 'grey',
            fontSize: 16,
            padding: 16,
          }}>
          {title}
        </Text>
      )}
      renderItem={({item, index}: {item: PlaylistItem; index: number}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail', {
              ...item,
              videoId: item.snippet.resourceId.videoId,
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
      )}
    />
  );
};

export const ListScreen = () => {
  const {data, error, isValidating} = useSWR('/api/playlist', playlistFetcher);
  return isValidating ? null : (
    <View>
      {/* {data?.data.items.map(item => {
        return <MovieList {...item} />;
      })} */}
      {data ? (
        <ListData
          {...{
            dataSet: data?.data.items.map(item => {
              return {
                id: item.id,
                title: item.snippet.title,
              };
            }),
          }}
        />
      ) : null}
    </View>
  );
};
