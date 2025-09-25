import React, { JSX } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import NoticationBox from '../component/NoticationBox';

function NotificationScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerName}>Notification</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.notificationContainer}>
          <NoticationBox
            imageLink={require('../assets/png/popular/product1.jpeg')}
            title={'Your order #123456789 has been shipped successfully'}
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            }
            status={'new'}
          />
          <View style={styles.seperator} />
          <NoticationBox
            imageLink={require('../assets/png/armchair/armchair1.jpeg')}
            title={'Your order #123456789 has been shipped successfully'}
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            }
            status={'new'}
          />
          <View style={styles.seperator} />
          <NoticationBox
            imageLink={require('../assets/png/popular/product2.jpeg')}
            title={'Your order #123456789 has been confirmed'}
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            }
            status={'hot'}
          />
          <View style={styles.seperator} />
          <NoticationBox
            imageLink={require('../assets/png/popular/product3.jpeg')}
            title={'Discover hot sale furnitures this week.'}
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            }
            status={'hot'}
          />
          <View style={styles.seperator} />
          <NoticationBox
            imageLink={require('../assets/png/popular/product4.jpeg')}
            title={'Your order #123456789 has been canceled'}
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            }
            status={''}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    marginTop: 12,
  },
  headerName: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#242424',
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  notificationContainer: {
    marginTop: 24,
    marginHorizontal: 20,
    paddingBottom: 16,
    gap: 16,
  },
  seperator: {
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});
