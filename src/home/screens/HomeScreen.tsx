import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native-elements/dist/image/Image';
import {FavScreen} from '../../favs/screens/FavScreens';
import {MoviesScreen} from '../../movies/screens';

const Tab = createBottomTabNavigator();

export const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={
                focused
                  ? require('../../assets/movieLight.png')
                  : require('../../assets/movieDisabled.png')
              }
              style={{
                width: 36,
                height: 36,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={
                focused
                  ? require('../../assets/favLight.png')
                  : require('../../assets/favDisabled.png')
              }
              style={{
                width: 36,
                height: 36,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};
