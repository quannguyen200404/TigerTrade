import React, { JSX } from 'react';
import {StyleSheet, View, Image, Text, ImageSourcePropType} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  imageLink: ImageSourcePropType;
  userName: string;
  description: string;
};

function ReviewBox({imageLink, userName, description}: Props): JSX.Element {
  return (
    <View>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.name}>{userName}</Text>
            <View style={styles.rating}>
              <Ionicons name={'star-sharp'} size={16} color="#F2C94C" />
              <Ionicons name={'star-sharp'} size={16} color="#F2C94C" />
              <Ionicons name={'star-sharp'} size={16} color="#F2C94C" />
              <Ionicons name={'star-sharp'} size={16} color="#F2C94C" />
              <Ionicons name={'star-sharp'} size={16} color="#F2C94C" />
            </View>
          </View>
          <Text style={styles.date}>20/03/2020</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Image source={imageLink} style={styles.product} />
    </View>
  );
}

export default ReviewBox;

const styles = StyleSheet.create({
  reviewContainer: {
    margin: 20,
    padding: 16,
    paddingTop: 40,
    gap: 16,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  productContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  product: {
    position: 'absolute',
    alignSelf: 'center',
  },
  productDetail: {
    paddingVertical: 8.5,
    gap: 5,
  },
  productName: {
    fontWeight: '400',
    fontSize: 16,
    color: '#242424',
  },
  productPrice: {
    fontWeight: '600',
    fontSize: 16,
    color: '#242424',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    gap: 5,
  },
  rating: {
    flexDirection: 'row',
    gap: 5,
  },
  name: {
    fontWeight: '400',
    fontSize: 14,
    color: '#242424',
  },
  date: {
    fontWeight: '400',
    fontSize: 12,
    color: '#909090',
  },
  description: {
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
});
