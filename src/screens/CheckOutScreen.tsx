import React, {JSX, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
  TextInput,
  Image,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../types/navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {realmContext} from '../realm/RealmContext';
import {ShippingAddress} from '../realm/ShippingAddress';
import {PaymentMethod} from '../realm/PaymentMethod';
import Feather from 'react-native-vector-icons/Feather';
import ScreenTitle from '../component/ScreenTitle';
import BlackButton from '../component/BlackButton';

type StackProps = StackScreenProps<RootStackParamList, 'CheckOut'>;

type Props = StackProps;

const {useRealm} = realmContext;

function CheckOutScreen({route}: Props): JSX.Element {
  const {totalPrice} = route.params;
  const navigation = useNavigation();
  const realm = useRealm();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');
  const nameInputRef = useRef<TextInput>(null);
  const addressInputRef = useRef<TextInput>(null);
  const paymentInputRef = useRef<TextInput>(null);
  const total = totalPrice + 5;

  async function onDisplayNotification() {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Order Status',
      body: 'You have successfully ordered.',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  useEffect(() => {
    const lastShippingAddress = realm.objects(ShippingAddress)[0];
    const lastPaymentMethod = realm.objects(PaymentMethod)[0];
    if (lastShippingAddress) {
      setName(lastShippingAddress.addressName);
      setAddress(lastShippingAddress.addressDetail);
    }
    if (lastPaymentMethod) {
      setPayment(lastPaymentMethod.cardNumber);
    }
  }, [realm]);

  const handlePaymentChange = (newText: string) => {
    const sanitizedText = newText.replace(/[^0-9]/g, '').slice(0, 16);
    setPayment(sanitizedText);
  };

  const handleNameSubmit = () => {
    if (addressInputRef.current) {
      addressInputRef.current.focus();
    }
  };

  const handleAddressSubmit = () => {
    if (addressInputRef.current) {
      addressInputRef.current.blur();
    }
  };

  const handleDonePress = (): void => {
    const censoredText = payment.replace(/.{12}/g, '**** **** **** ');
    setPayment(censoredText);
    Keyboard.dismiss();
  };

  const handleAddressClick = () => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  const handlePaymentClick = () => {
    if (paymentInputRef.current) {
      paymentInputRef.current.focus();
    }
  };

  const handleCheckOut = () => {
    navigation.navigate('Congrats');
    onDisplayNotification();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={'Check out'} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.checkOutContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.title}>
              <Text style={styles.shippingAddress}>Shipping address</Text>
              <Pressable onPress={handleAddressClick}>
                <Feather name={'edit'} size={17} color="#242424" />
              </Pressable>
            </View>
            <View style={styles.addressInfoContainer}>
              <TextInput
                style={styles.name}
                onChangeText={setName}
                value={name}
                onSubmitEditing={handleNameSubmit}
                ref={nameInputRef}
                enablesReturnKeyAutomatically
                blurOnSubmit={false}
              />
              <View style={styles.seperator} />
              <TextInput
                style={styles.address}
                multiline
                numberOfLines={2}
                maxLength={100}
                onChangeText={setAddress}
                value={address}
                onSubmitEditing={handleAddressSubmit}
                ref={addressInputRef}
                enablesReturnKeyAutomatically
                blurOnSubmit={true}
              />
            </View>
          </View>
          <View style={styles.payment}>
            <View style={styles.paymentTitle}>
              <Text style={styles.paymentText}>Payment</Text>
              <Pressable onPress={handlePaymentClick}>
                <Feather name={'edit'} size={17} color="#242424" />
              </Pressable>
            </View>
            <View style={styles.paymentMethod}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/png/checkOutScreen/mastercard.png')}
                />
              </View>
              <TextInput
                ref={paymentInputRef}
                style={styles.cardInput}
                onChangeText={handlePaymentChange}
                value={payment}
                maxLength={19}
                keyboardType="numeric"
                enablesReturnKeyAutomatically
                blurOnSubmit={false}
                returnKeyType="done"
                onSubmitEditing={handleDonePress}
              />
            </View>
          </View>
          <View style={styles.delivery}>
            <View style={styles.deliveryTitle}>
              <Text style={styles.deliveryText}>Delivery method</Text>
              <Pressable>
                <Feather name={'edit'} size={17} color="#242424" />
              </Pressable>
            </View>
            <View style={styles.deliveryMethod}>
              <Image
                source={require('../assets/png/checkOutScreen/delivery.png')}
                style={styles.deliveryIcon}
              />
              <Text style={styles.deliveryDescription}>Fast (2-3days)</Text>
            </View>
          </View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summary}>Order</Text>
              <Text style={styles.price}>$ {totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summary}>Delivery</Text>
              <Text style={styles.price}>$ 5.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summary}>Total</Text>
              <Text style={styles.total}>$ {total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleCheckOut} style={styles.button}>
          <BlackButton title={'Submit order'} />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default CheckOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  checkOutContainer: {
    flex: 1,
    marginTop: 27,
    marginHorizontal: 20,
    paddingBottom: 24,
    gap: 24,
  },
  addressContainer: {
    gap: 12,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shippingAddress: {
    fontWeight: '600',
    fontSize: 18,
    color: '#909090',
  },
  addressInfoContainer: {
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
  name: {
    fontWeight: '600',
    fontSize: 18,
    color: '#242424',
  },
  seperator: {
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  address: {
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
  payment: {
    gap: 12,
  },
  paymentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentText: {
    fontWeight: '400',
    fontSize: 18,
    color: '#909090',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 68,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    width: 64,
    height: 38,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
  cardInput: {
    flex: 1,
    marginLeft: 16,
    fontWeight: '600',
    fontSize: 14,
    color: '#242424',
  },
  delivery: {
    gap: 12,
  },
  deliveryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#909091',
  },
  deliveryMethod: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 54,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
  deliveryIcon: {
    marginLeft: 20.12,
    marginRight: 14.13,
  },
  deliveryDescription: {
    fontWeight: '600',
    fontSize: 14,
    color: '#303030',
  },
  summaryContainer: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 19,
    height: 134,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summary: {
    fontWeight: '400',
    fontSize: 18,
    color: '#909090',
  },
  price: {
    fontWeight: '400',
    fontSize: 18,
    color: '#242424',
  },
  total: {
    fontWeight: '600',
    fontSize: 18,
    color: '#242424',
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
});
