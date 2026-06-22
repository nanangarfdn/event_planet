import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home/HomeScreen';
import {ExploreScreen} from '../screens/explore/ExploreScreen';
import {CreateEventScreen} from '../screens/create/CreateEventScreen';
import {CreditsScreen} from '../screens/credits/CreditsScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {TabBar} from './TabBar';
import type {TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Create" component={CreateEventScreen} />
      <Tab.Screen name="Credits" component={CreditsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
