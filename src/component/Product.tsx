import React, { JSX } from 'react';
import {add} from '../redux/slices/cartSlice';
import {useDispatch} from 'react-redux';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {TProduct} from 'types/object';

type Props = {
  product: TProduct;
  imageLink: ImageSourcePropType;
  productName: string;
  priceTag: number;
};

function Product({
  product,
  imageLink,
  productName,
  priceTag,
}: Props): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addToCart = () => dispatch(add(product));

  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate('ProductDetails', {
            item: product,
            headerName: productName,
            productPrice: priceTag,
            imageSource: imageLink,
          });
        }}>
        <Image source={imageLink} style={styles.product} />
      </Pressable>
      <TouchableOpacity onPress={addToCart} style={styles.button}>
        <Fontisto name={'shopping-bag'} size={16} color={'#303030'} />
      </TouchableOpacity>
      <Text style={styles.titleText}>{productName}</Text>
      <Text style={styles.baseText}>$ {priceTag?.toFixed(2)}</Text>
    </View>
  );
}

export default Product;

const styles = StyleSheet.create({
  product: {
    width: 157,
    height: 200,
    borderRadius: 10,
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 160,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  titleText: {
    marginTop: 12,
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
  baseText: {
    marginTop: 4,
    fontWeight: '600',
    fontSize: 14,
    color: '#303030',
  },
});
