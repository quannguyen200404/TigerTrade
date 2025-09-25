import React, { JSX } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenTitle from '../component/ScreenTitle';
import ReviewBox from '../component/ReviewBox';
import BlackButton from '../component/BlackButton';

type StackProps = StackScreenProps<RootStackParamList, 'Review'>;

type Props = StackProps;

function ReviewScreen({route}: Props): JSX.Element {
  const {productName, imageLink} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={'Rating & Review'} />
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.reviewContainer}>
          <View style={styles.productContainer}>
            <Image source={imageLink} style={styles.product} />
            <View style={styles.itemDetail}>
              <Text style={styles.productName}>{productName}</Text>
              <View style={styles.rate}>
                <Ionicons name={'star-sharp'} size={22} color="#F2C94C" />
                <Text style={styles.ratingNumber}>4.5</Text>
              </View>
              <Text style={styles.totalRating}>10 reviews</Text>
            </View>
          </View>
        </View>
        <ReviewBox
          imageLink={require('../assets/png/reviewScreen/avatar1.png')}
          userName={'Bruno Fernandes'}
          description={
            'Nice furniture with good delivery. The delivery time is very fast. Then products look like exactly the picture in the app.'
          }
        />
        <ReviewBox
          imageLink={require('../assets/png/reviewScreen/avatar2.png')}
          userName={'Kristin Watson'}
          description={
            'Nice furniture with good delivery. The delivery time is very fast. Then products look like exactly the picture in the app. Besides, color is also the same and quality is very good despite very cheap price.'
          }
        />
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <BlackButton title={'Write a review'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    gap: 24,
  },
  reviewContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    gap: 24,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  product: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetail: {
    gap: 8,
  },
  productName: {
    fontWeight: '400',
    fontSize: 14,
    color: '#242424',
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingNumber: {
    fontWeight: '700',
    fontSize: 24,
    color: '#242424',
  },
  totalRating: {
    fontWeight: '400',
    fontSize: 18,
    color: '#242424',
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
});
