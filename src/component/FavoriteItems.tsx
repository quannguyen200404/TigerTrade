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
import {add} from '../redux/slices/cartSlice';
import {realmContext} from '../realm/RealmContext';
import {FavoriteProduct} from '../realm/FavoriteProduct';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

const {useRealm} = realmContext;

type Props = {
  product: FavoriteProduct;
  id: string;
  imageLink: ImageSourcePropType;
  productName: string;
  priceTag: number;
  quantity: number;
};

function FavoriteItems({
  product,
  id,
  imageLink,
  productName,
  priceTag,
  quantity,
}: Props): JSX.Element {
  const realm = useRealm();
  const dispatch = useDispatch();

  const addToCart = async () => {
    await dispatch(add({id, imageLink, productName, priceTag, quantity}));
  };

  const removeItemFromFavorite = () => {
    realm.write(() => {
      realm.delete(product);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={imageLink} style={styles.product} />
        <View style={styles.itemDetail}>
          <Text style={styles.titleText}>{productName}</Text>
          <Text style={styles.baseText}>$ {priceTag?.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.action}>
        <TouchableOpacity onPress={removeItemFromFavorite}>
          <Feather name={'x-circle'} size={24} color={'#242424'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={addToCart} style={styles.button}>
          <Fontisto name={'shopping-bag'} size={16} color={'#303030'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FavoriteItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 20,
  },
  content: {
    flexDirection: 'row',
    gap: 16,
  },
  product: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetail: {
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
    color: '#303030',
  },
  action: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
});
