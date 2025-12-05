import React, { JSX } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  HomeScreen,
  FavoriteScreen,
  NotificationScreen,
  ChatListScreen,
  ProfileScreen,
} from '../../screens';

import { HomeTabParamList } from '../../types/navigation';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const screenOptions = ({route}: {route: RouteProp<HomeTabParamList>}) =>
  ({
    tabBarIcon: ({
      focused,
      color,
      size,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }) => {
      let iconName: any;

      if (route.name === 'House') {
        iconName = focused ? 'home-sharp' : 'home-outline';
      } else if (route.name === 'Favorite') {
        iconName = focused ? 'bookmark' : 'bookmark-outline';
      } else if (route.name === 'Notification') {
        iconName = focused ? 'notifications' : 'notifications-outline';
      } else if (route.name === 'ChatList') {
        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'person' : 'person-outline';
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#242424',
    tabBarInactiveTintColor: '#909090',
    tabBarLabelStyle: {display: 'none'},
  } as BottomTabNavigationOptions);

function HomeTab(): JSX.Element {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="House"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default HomeTab;
