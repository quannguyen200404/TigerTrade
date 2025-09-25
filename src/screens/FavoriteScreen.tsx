import React, { JSX } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {add} from '../redux/slices/cartSlice';
import {FavoriteProduct} from '../realm/FavoriteProduct';
import {realmContext} from '../realm/RealmContext';
import FavoriteItems from '../component/FavoriteItems';
import BlackButton from '../component/BlackButton';

const {useQuery} = realmContext;

function Separator() {
  return <View style={styles.seperator} />;
}

function FavoriteScreen(): JSX.Element {
  const items = useQuery(FavoriteProduct).sorted('id');
  const hasItems = items.length > 0;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const addAllToCart = async () => {
    for (const item of items) {
      const {id, imageLink, productName, priceTag, quantity} = item;
      await dispatch(add({id, imageLink, productName, priceTag, quantity}));
    }
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerName}>Favorites</Text>
      </View>
      <View style={styles.cartItems}>
        <FlatList
          data={items}
          ItemSeparatorComponent={() => Separator()}
          renderItem={({item}) => (
            <FavoriteItems
              product={item}
              id={item.id}
              imageLink={item.imageLink}
              productName={item.productName}
              priceTag={item.priceTag}
              quantity={item.quantity}
            />
          )}
          contentContainerStyle={styles.flatlist}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {hasItems && (
        <TouchableOpacity onPress={addAllToCart} style={styles.button}>
          <BlackButton title={'Add all to my cart'} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    marginTop: 12,
    height: 24,
  },
  headerName: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#242424',
  },
  cartItems: {
    flex: 1,
    marginTop: 16,
  },
  seperator: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderRadius: 10,
  },
  flatlist: {
    paddingBottom: 20,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
});
