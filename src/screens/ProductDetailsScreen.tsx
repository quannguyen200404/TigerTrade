import React, {JSX, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import {increase} from '../redux/slices/cartSlice';
import {UpdateMode} from 'realm';
import {realmContext} from '../realm/RealmContext';
import {TProduct} from '../types/object';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import BlackButton from '../component/BlackButton';

type StackProps = StackScreenProps<RootStackParamList, 'ProductDetails'>;

type Props = StackProps;

const {useRealm} = realmContext;

function ProductDetailsScreen({route}: Props): JSX.Element {
  const {item, headerName, productPrice, imageSource} = route.params;
  const realm = useRealm();
  const [count, setCount] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFavorite =
    realm.objects('FavoriteProduct').filtered(`id = '${item.id}'`).length > 0;
  const [isInFavorite, setIsFavorite] = useState(isFavorite);

  const addFavoriteProduct = () => {
    if (!isFavorite) {
      realm.write(() => {
        realm.create<TProduct>(
          'FavoriteProduct',
          {
            id: item.id,
            imageLink: imageSource,
            productName: headerName,
            priceTag: productPrice,
            quantity: item.quantity,
          },
          UpdateMode.Modified,
        );
      });
      setIsFavorite(true);
    } else {
      realm.write(() => {
        const favoriteProduct = realm
          .objects('FavoriteProduct')
          .filtered(`id = '${item.id}'`)[0];
        realm.delete(favoriteProduct);
      });
      setIsFavorite(false);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToCart = () => {
    dispatch(increase({...item, count}));
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <Image source={imageSource} style={styles.media} />
        <View style={styles.desContainer}>
          <View style={styles.title}>
            <Text style={styles.header}>{headerName}</Text>
            <View style={styles.price}>
              <Text style={styles.priceTag}>$ {productPrice?.toFixed(2)}</Text>
              <View style={styles.amountContainer}>
                <TouchableOpacity
                  onPress={decrementCount}
                  style={styles.amountButton}>
                  <Feather name={'minus'} size={23} color="#242424" />
                </TouchableOpacity>
                <Text style={styles.number}>
                  {count.toString().padStart(2, '0')}
                </Text>
                <TouchableOpacity
                  onPress={incrementCount}
                  style={styles.amountButton}>
                  <Feather name={'plus'} size={23} color="#242424" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rating}>
              <Pressable
                onPress={() => {
                  navigation.navigate('Review', {
                    productName: headerName,
                    imageLink: imageSource,
                  });
                }}>
                <View style={styles.rate}>
                  <Ionicons name={'star-sharp'} size={22} color="#F2C94C" />
                  <Text style={styles.ratingNumber}>4.5</Text>
                </View>
              </Pressable>
              <Text style={styles.totalRating}>(50 reviews)</Text>
            </View>
            <Text style={styles.description}>
              {headerName} is made of by natural wood. The design that is very
              simple and minimal. This is truly one of the best furnitures in
              any family for now. With 3 different colors, you can easily select
              the best match for your home.
            </Text>
          </View>
        </View>
        <View style={styles.action}>
          <TouchableOpacity
            onPress={addFavoriteProduct}
            style={[
              styles.favoriteButton,
              isInFavorite ? styles.active : styles.inActive,
            ]}>
            <Ionicons
              name={isInFavorite ? 'bookmark' : 'bookmark-outline'}
              size={25}
              color={isInFavorite ? 'white' : '#909090'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={addToCart} style={styles.button}>
            <BlackButton title={'Add to cart'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backContainer}>
        <Ionicons name={'chevron-back'} size={25} color="#242424" />
      </TouchableOpacity>
    </View>
  );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  media: {
    width: 323,
    height: 455,
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 50,
  },
  backContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 53,
    marginLeft: 32,
    width: 40,
    height: 40,
    elevation: 4,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  desContainer: {
    marginTop: 25,
    paddingBottom: 10,
    gap: 16,
  },
  title: {
    marginHorizontal: 20,
    gap: 8,
  },
  header: {
    fontWeight: '400',
    fontSize: 24,
    color: '#242424',
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceTag: {
    fontWeight: '600',
    fontSize: 32,
    color: '#242424',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  amountButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 6,
    opacity: 40,
    backgroundColor: '#E0E0E0',
  },
  number: {
    fontWeight: '400',
    fontSize: 18,
    color: '#242424',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rate: {
    flexDirection: 'row',
    gap: 6,
  },
  ratingNumber: {
    fontWeight: '600',
    fontSize: 18,
    color: '#242424',
  },
  totalRating: {
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
  description: {
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
  action: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 16,
  },
  favoriteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  active: {
    backgroundColor: '#242424',
  },
  inActive: {
    backgroundColor: '#E0E0E0',
  },
  button: {
    flex: 1,
  },
});
