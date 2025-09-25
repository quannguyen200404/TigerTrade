import {useNavigation} from '@react-navigation/native';
import React, {JSX, useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {TProduct} from '../types/object';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenTitle from '../component/ScreenTitle';
import CartItems from '../component/CartItems';
import BlackButton from '../component/BlackButton';

function Separator() {
  return <View style={styles.seperator} />;
}

function CartScreen(): JSX.Element {
  const navigation = useNavigation();
  const cart = useSelector((state: {cart: TProduct[]}) => state.cart);
  const [text, setText] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const promoRef = useRef<TextInput>(null);
  const hasItems = cart.length > 0;

  useEffect(() => {
    setTotalAmount(
      cart.reduce(
        (acc: number, curr: {priceTag: number; quantity: number}) =>
          acc + curr.priceTag * curr.quantity,
        0,
      ),
    );
  }, [cart]);

  const handlePromoSubmit = () => {
    promoRef.current?.blur();
  };

  return (
    <SafeAreaView style={styles.titleContainer}>
      <ScreenTitle title={'My cart'} />
      <View style={styles.cartItems}>
        <FlatList
          data={cart}
          ItemSeparatorComponent={() => Separator()}
          renderItem={({item}) => (
            <CartItems
              product={item}
              imageLink={item.imageLink}
              productName={item.productName}
              priceTag={item.priceTag}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {hasItems && (
        <View style={styles.bottomContainer}>
          <View style={styles.promoBox}>
            <TextInput
              ref={promoRef}
              style={styles.promoInput}
              onChangeText={newText => setText(newText)}
              defaultValue={text}
              placeholder="Enter your promo code"
              enablesReturnKeyAutomatically
              blurOnSubmit={true}
              maxLength={18}
            />
            <TouchableOpacity
              onPress={handlePromoSubmit}
              style={styles.applyButton}>
              <Ionicons name={'chevron-forward'} size={25} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.totalPrice}>
            <Text style={styles.total}>Total:</Text>
            <Text style={styles.price}>$ {totalAmount.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CheckOut', {totalPrice: totalAmount});
            }}>
            <BlackButton title={'Check out'} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
  },
  cartItems: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 24,
    paddingBottom: 15,
  },
  seperator: {
    marginVertical: 16,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderBottomColor: '#E0E0E0',
  },
  bottomContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    gap: 20,
  },
  promoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: 'white',
  },
  promoInput: {
    flex: 1,
    paddingLeft: 19,
    fontWeight: '400',
    fontSize: 16,
    color: '#909090',
  },
  applyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#242424',
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    fontWeight: '700',
    fontSize: 20,
    color: '#808080',
  },
  price: {
    fontWeight: '700',
    fontSize: 20,
    color: '#303030',
  },
});
