import React, {JSX, useState} from 'react';
import {StyleSheet, SafeAreaView, View, FlatList} from 'react-native';
import ScreenTitle from '../component/ScreenTitle';
import AddCircleButton from '../component/AddCircleButton';
import PaymentBox from '../component/PaymentBox';
import {PaymentMethod} from '../realm/PaymentMethod';
import {realmContext} from '../realm/RealmContext';

const {useRealm, useQuery} = realmContext;

function PaymentMethodScreen(): JSX.Element {
  const realm = useRealm();
  const items = useQuery(PaymentMethod).sorted('timestamp', true);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState<string>(
    items.length > 0 ? items[0].id : '',
  );
  const handlePaymentBoxSelect = (index: string) => {
    setSelectedPaymentIndex(index);
    const currentPaymentMethod = realm
      .objects(PaymentMethod)
      .filtered(`id = "${index}"`)[0];
    realm.write(() => {
      currentPaymentMethod.timestamp = new Date();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={'Payment method'} />
      <View style={styles.paymentContainer}>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <PaymentBox
              paymentMethod={item}
              cardType={item.cardType}
              cardNumber={item.cardNumber}
              cardHolderName={item.cardHolderName}
              cardExpiryDate={item.cardExpiryDate}
              selected={selectedPaymentIndex === item.id}
              onSelect={() => handlePaymentBoxSelect(item.id)}
            />
          )}
          contentContainerStyle={styles.flatlist}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <AddCircleButton screenName={'AddPayment'} />
    </SafeAreaView>
  );
}

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paymentContainer: {
    flex: 1,
    marginHorizontal: 21,
    marginTop: 34,
    gap: 40,
  },
  flatlist: {
    paddingBottom: 40,
    gap: 40,
  },
});
