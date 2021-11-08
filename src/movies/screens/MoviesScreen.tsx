import { View } from "react-native"
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GridScreen, ListScreen } from ".";

const Tab = createMaterialTopTabNavigator();

export const MoviesScreen = () => {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Grid" component={GridScreen} />
          <Tab.Screen name="List" component={ListScreen} />
        </Tab.Navigator>
      );
}