import React, {JSX, useCallback, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Text,
  BackHandler,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import DeliveredRoute from './OrderTab/DeliveredRoute';
import ProcessingRoute from './OrderTab/ProcessingRoute';
import CanceledRoute from './OrderTab/CanceledRoute';
import ScreenTitle from '../../component/ScreenTitle';

const renderScene = SceneMap({
  delivered: DeliveredRoute,
  processing: ProcessingRoute,
  canceled: CanceledRoute,
});

const renderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      renderLabel={({
        route,
        focused,
      }: {
        route: { key: string; title: string };
        focused: boolean;
      }) => (
        <Text style={focused ? styles.activeLabel : styles.inactiveLabel}>
          {route.title}
        </Text>
      )}
      indicatorStyle={styles.indicator}
      style={styles.background}
    />
  );
};

function OrderView(): JSX.Element {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'delivered', title: 'Delievered'},
    {key: 'processing', title: 'Processing'},
    {key: 'canceled', title: 'Canceled'},
  ]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home');
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        backHandler.remove();
      };
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={'My orders'} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
}

export default OrderView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activeLabel: {
    fontWeight: '400',
    fontSize: 18,
    color: '#242424',
  },
  inactiveLabel: {
    fontWeight: '400',
    fontSize: 18,
    color: '#909090',
  },
  indicator: {
    height: 4,
    borderRadius: 4,
    backgroundColor: '#242424',
  },
  background: {
    marginTop: 20,
    elevation: 0,
    backgroundColor: 'white',
  },
});
