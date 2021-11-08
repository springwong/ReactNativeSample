import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PlaylistItem} from '../../apis/models/PlaylistItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Rating, AirbnbRating} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';

export const DetailScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<any, any>) => {
    const [isFav, setIsFav] = useState(false)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={
            () => {
                setIsFav(!isFav)
            }
        }>
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={isFav ? require('../../assets/favLight.png') : require('../../assets/favDisabled.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isFav]);
  const item = route.params as PlaylistItem;
  item.snippet.title;
  return (
    <SafeAreaView
      edges={['right', 'bottom', 'left']}
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <Image
          style={{
            width: '100%',
            aspectRatio:
              item.snippet.thumbnails.high.width /
              item.snippet.thumbnails.high.height,
          }}
          source={{
            uri: item.snippet.thumbnails.high.url,
          }}
        />
        <View
          style={{
            marginTop: -1 * 80,
            paddingHorizontal: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              style={{
                height: 180,
                aspectRatio: 9 / 16,
                resizeMode: 'cover',
                borderRadius: 6,
              }}
              source={{
                uri: item.snippet.thumbnails.high.url,
              }}
            />
            <View
              style={{
                padding: 8,
              }}>
              <View
                style={{
                  height: 80,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'grey',
                    borderRadius: 6,
                    padding: 4,
                  }}>
                  <Text
                    style={{
                      flexGrow: 8,
                    }}>
                    {item.snippet.title}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 100,
                }}>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 16,
                  }}>
                  {item.snippet.channelTitle}
                </Text>
                <AirbnbRating
                  showRating={false}
                  defaultRating={0}
                  // onFinishRating={this.ratingCompleted}
                />
              </View>
            </View>
          </View>
          <Text>{item.snippet.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
