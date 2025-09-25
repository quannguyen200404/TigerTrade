import React, { JSX } from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import ScreenTitle from '../component/ScreenTitle';
import MyReviewsBox from '../component/MyReviewsBox';

function MyReviewsScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={'My reviews'} />
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.myReviewContainer}>
          <MyReviewsBox
            imageLink={require('../assets/png/popular/product1.jpeg')}
            productName={'Black Simple Lamp'}
            priceTag={12}
          />
          <MyReviewsBox
            imageLink={require('../assets/png/popular/product2.jpeg')}
            productName={'White Chair'}
            priceTag={10}
          />
          <MyReviewsBox
            imageLink={require('../assets/png/popular/product3.jpeg')}
            productName={'Coffee Chair'}
            priceTag={12}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyReviewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  myReviewContainer: {
    marginHorizontal: 20,
    marginTop: 25,
    paddingBottom: 16,
    gap: 16,
  },
});
