import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PlaylistItem} from '../../apis/models/PlaylistItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Rating, AirbnbRating} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import { likeMovie, rateMovie, unlikeMovie } from '../../store/slices/favSlice';

export const DetailScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<any, any>) => {
  const item = route.params as PlaylistItem;
  const videoId = route.params?.videoId;
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.fav.likes);
  useEffect(() => {
      setIsFav(likes.includes(videoId))
  }, [likes]);

  const stars = useSelector((state: RootState) => state.fav.stars);
  const [star, setStar] = useState(0);
  useEffect(() => {
      if (stars[videoId] !== undefined) {
          setStar(stars[videoId])
      }
  }, [stars])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (isFav) {
                dispatch(unlikeMovie(videoId))
            } else {
                dispatch(likeMovie(videoId))
            }
          }}>
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={
              isFav
                ? require('../../assets/favLight.png')
                : require('../../assets/favDisabled.png')
            }
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isFav]);
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
            width: '100%',
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
                zIndex: 100,
              }}
              source={{
                uri: item.snippet.thumbnails.high.url,
              }}
            />
            <View
              style={{
                padding: 8,
                flex: 1,
              }}>
              <View
                style={{
                  height: 80,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(70, 70, 70, 0.6)',
                    borderRadius: 6,
                    marginHorizontal: -50,
                    paddingHorizontal: 50,
                    paddingVertical: 8,
                    zIndex: 0,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
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
                  starContainerStyle={{
                    alignSelf: 'flex-start',
                  }}
                  showRating={false}
                  defaultRating={star}
                  selectedColor={'red'}
                  onFinishRating={(number: number) => {
                      dispatch(rateMovie({
                        videoId: videoId, 
                        rating: number,
                      }))
                  }}
                />
              </View>
            </View>
          </View>
          <Text style={{
              color: 'grey'
          }}>{item.snippet.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
