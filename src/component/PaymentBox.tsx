import React, { JSX } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {realmContext} from '../realm/RealmContext';
import {PaymentMethod} from '../realm/PaymentMethod';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  paymentMethod: PaymentMethod;
  cardType: string;
  cardNumber: string;
  cardHolderName: string;
  cardExpiryDate: string;
  selected: boolean;
  onSelect: () => void;
};

const {useRealm} = realmContext;

function PaymentBox({
  paymentMethod,
  cardType,
  cardNumber,
  cardHolderName,
  cardExpiryDate,
  selected,
  onSelect,
}: Props): JSX.Element {
  const realm = useRealm();

  const handleCheckboxChange = () => {
    onSelect();
  };

  const removePaymentMethod = () => {
    realm.write(() => {
      realm.delete(paymentMethod);
    });
  };

  let cardImageSource: ImageSourcePropType | null = null;

  if (cardType === 'Mastercard') {
    cardImageSource = require('../assets/png/card/mastercard.png');
  } else if (cardType === 'Visa') {
    cardImageSource = require('../assets/png/card/visa.png');
  }

  return (
    <View style={styles.paymentBox}>
      <View
        style={[
          styles.paymentCard,
          selected ? styles.usePaymentCard : styles.notUsePaymentCard,
        ]}>
        {cardImageSource && <Image source={cardImageSource} />}
        <Text style={styles.number}>{cardNumber}</Text>
        <View style={styles.cardDetail}>
          <View>
            <Text style={styles.title}>Card Holder Name</Text>
            <Text style={styles.detail}>{cardHolderName}</Text>
          </View>
          <View>
            <Text style={styles.title}>Expiry Date</Text>
            <Text style={styles.detail}>{cardExpiryDate}</Text>
          </View>
        </View>
        <Image
          source={require('../assets/png/card/background.png')}
          style={styles.backgroundCard}
        />
      </View>
      <View style={styles.paymentChoice}>
        <View style={styles.paymentOption}>
          <CheckBox
            value={selected}
            onValueChange={handleCheckboxChange}
            tintColors={{true: '#242424'}}
          />
          <Text style={selected ? styles.usePayment : styles.notUsePayment}>
            Use as default payment method
          </Text>
        </View>
        <TouchableOpacity onPress={removePaymentMethod}>
          <Feather name={'x-circle'} size={24} color={'#242424'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PaymentBox;

const styles = StyleSheet.create({
  paymentBox: {
    gap: 20,
  },
  paymentCard: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 40,
    paddingTop: 20,
    height: 180,
    elevation: 4,
    borderRadius: 7.77,
  },
  usePaymentCard: {
    backgroundColor: '#242424',
  },
  notUsePaymentCard: {
    backgroundColor: '#999999',
  },
  number: {
    marginTop: 18.34,
    fontWeight: '400',
    fontSize: 20,
    color: 'white',
  },
  cardDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 27.1,
  },
  title: {
    paddingBottom: 2.45,
    fontWeight: '400',
    fontSize: 12,
    opacity: 0.8,
    color: 'white',
  },
  detail: {
    fontWeight: '400',
    fontSize: 14,
    color: 'white',
  },
  backgroundCard: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
  },
  paymentChoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usePayment: {
    fontWeight: '400',
    fontSize: 18,
    color: '#242424',
  },
  notUsePayment: {
    fontWeight: '400',
    fontSize: 18,
    color: '#909090',
  },
});
