import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useSWR from 'swr';
import {playlistFetcher} from '../../apis/youtube';

export const SplashScreen = () => {
  const {data, error} = useSWR('/api/playlist', playlistFetcher);
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
