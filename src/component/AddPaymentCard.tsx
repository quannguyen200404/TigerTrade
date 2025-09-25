import React, { JSX } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

function PaymentBox(): JSX.Element {
  return (
    <View style={styles.paymentCard}>
      <View style={styles.cardType}>
        <Image source={require('../assets/png/card/mastercard.png')} />
        <Image source={require('../assets/png/card/visa.png')} />
      </View>
      <Text style={styles.number}>{'* * * *  * * * *  * * * *  XXXX'}</Text>
      <View style={styles.cardDetail}>
        <View>
          <Text style={styles.title}>Card Holder Name</Text>
          <Text style={styles.detail}>XXXXXX</Text>
        </View>
        <View>
          <Text style={styles.title}>Expiry Date</Text>
          <Text style={styles.detail}>XX/XX</Text>
        </View>
      </View>
      <Image
        source={require('../assets/png/card/background.png')}
        style={styles.backgroundCard}
      />
    </View>
  );
}

export default PaymentBox;

const styles = StyleSheet.create({
  paymentCard: {
    paddingLeft: 24,
    paddingRight: 40,
    paddingTop: 20,
    height: 180,
    elevation: 4,
    borderRadius: 7.77,
    backgroundColor: '#242424',
  },
  cardType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18.04,
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
