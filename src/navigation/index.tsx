import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './stack/rootStack';
import {navigationRef} from './rootNavigator';

const Navigator = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => RNBootSplash.hide()}>
      <AppStack />
    </NavigationContainer>
  );
};

export default Navigator;
