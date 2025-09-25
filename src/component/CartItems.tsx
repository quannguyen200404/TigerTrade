import React, { JSX } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {remove} from '../redux/slices/cartSlice';
import {TProduct} from '../types/object';
import Feather from 'react-native-vector-icons/Feather';
import AmountButton from './AmountButton';

type Props = {
  product: TProduct;
  imageLink: ImageSourcePropType;
  productName?: string;
  priceTag?: number;
};

function CartItems({
  product,
  imageLink,
  productName,
  priceTag,
}: Props): JSX.Element {
  const dispatch = useDispatch();
  const removeItemFromCart = () => dispatch(remove(product.id));

  return (
    <View style={styles.container}>
      <Image source={imageLink} style={styles.product} />
      <View style={styles.itemContainer}>
        <View style={styles.itemDetail}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{productName}</Text>
            <Text style={styles.baseText}>$ {priceTag?.toFixed(2)}</Text>
          </View>
          <TouchableOpacity onPress={removeItemFromCart}>
            <Feather name={'x-circle'} size={24} color={'#242424'} />
          </TouchableOpacity>
        </View>
        <AmountButton productID={product} />
      </View>
    </View>
  );
}

export default CartItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
  },
  product: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    gap: 5,
  },
  titleText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
  baseText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#242424',
  },
});
