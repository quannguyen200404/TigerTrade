import React, { JSX } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {add, decrease} from '../redux/slices/cartSlice';
import { TProduct } from '../types/object';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  productID: TProduct;
};

function AmountButton({productID}: Props): JSX.Element {
  const dispatch = useDispatch();
  const quantity = useSelector((state: {cart: TProduct[]}) => {
    const product = state.cart.find(item => item.id === productID.id);
    return product ? product.quantity : 0;
  });

  const incrementCount = () => {
    dispatch(add(productID));
  };

  const decrementCount = () => {
    if (quantity > 1) {
      dispatch(decrease(productID));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrementCount} style={styles.button}>
        <Feather name={'minus'} size={23} color="#242424" />
      </TouchableOpacity>
      <Text style={styles.number}>{quantity.toString().padStart(2, '0')}</Text>
      <TouchableOpacity onPress={incrementCount} style={styles.button}>
        <Feather name={'plus'} size={23} color="#242424" />
      </TouchableOpacity>
    </View>
  );
}

export default AmountButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
  },
  number: {
    fontWeight: '400',
    fontSize: 18,
    color: '#242424',
  },
});
