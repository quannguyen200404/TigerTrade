import React, { JSX } from 'react';
import {StyleSheet, View, Image, Text, ImageSourcePropType} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  imageLink: ImageSourcePropType;
  productName: string;
  priceTag: number;
};

function MyReviewsBox({imageLink, productName, priceTag}: Props): JSX.Element {
  return (
    <View style={styles.myReviewsContainer}>
      <View style={styles.productContainer}>
        <Image source={imageLink} style={styles.product} />
        <View style={styles.productDetail}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.productPrice}>$ {priceTag?.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.rating}>
          <Ionicons name={'star-sharp'} size={16} color="#F2C94C" />
          <Ionicons name={'star-sharp'} size={16} color="#F2C94C" />
          <Ionicons name={'star-sharp'} size={16} color="#F2C94C" />
          <Ionicons name={'star-sharp'} size={16} color="#F2C94C" />
          <Ionicons name={'star-sharp'} size={16} color="#F2C94C" />
        </View>
        <Text style={styles.date}>20/03/2020</Text>
      </View>
      <Text style={styles.description}>
        Nice furniture with good delivery. The delivery time is very fast. Then
        products look like exactly the picture in the app. Besides, color is
        also the same and quality is very good despite very cheap price.
      </Text>
    </View>
  );
}

export default MyReviewsBox;

const styles = StyleSheet.create({
  myReviewsContainer: {
    padding: 16,
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
    width: 70,
    height: 70,
    borderRadius: 6,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    gap: 5,
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
