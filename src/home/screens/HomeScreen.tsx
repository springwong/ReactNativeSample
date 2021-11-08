import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import { MoviesScreen } from '../../movies/screens';

const Tab = createBottomTabNavigator();

export const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movie" component={MoviesScreen} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};
