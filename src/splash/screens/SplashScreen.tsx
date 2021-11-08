import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useSWR, { mutate } from 'swr';
import {playlistFetcher, playlistItemFetcher} from '../../apis/youtube';

export const SplashScreen = ({ route, navigation }: NativeStackScreenProps<any, any>) => {
  const {data, error} = useSWR('/api/playlist', playlistFetcher);
  useEffect(() => {
      if (data) {
        navigation.replace('Home')
      }
  }, [data])
  return (
    <SafeAreaView
      edges={['right', 'bottom', 'left']}
      style={{
        justifyContent: 'center',
        flex: 1,
        // backgroundColor: 'red',
      }}>
      <View
        style={
          {
            //   backgroundColor: 'blue',
            //   flex: 1,
          }
        }>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" />
          <Text
            style={{
              marginTop: 8,
            }}>
            {'Loading Movies'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
