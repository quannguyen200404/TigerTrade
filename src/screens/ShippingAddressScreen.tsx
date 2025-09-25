import React, {JSX, useState} from 'react';
import {StyleSheet, SafeAreaView, View, FlatList} from 'react-native';
import {realmContext} from '../realm/RealmContext';
import {ShippingAddress} from '../realm/ShippingAddress';
import ScreenTitle from '../component/ScreenTitle';
import AddressBox from '../component/AddressBox';
import AddCircleButton from '../component/AddCircleButton';

const {useRealm, useQuery} = realmContext;

function ShippingAddressScreen(): JSX.Element {
  const realm = useRealm();
  const items = useQuery(ShippingAddress).sorted('timestamp', true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<string>(
    items.length > 0 ? items[0].id : '',
  );

  const handleAddressBoxSelect = (index: string) => {
    setSelectedAddressIndex(index);
    const currentShippingAddress = realm
      .objects(ShippingAddress)
      .filtered(`id = "${index}"`)[0];
    realm.write(() => {
      currentShippingAddress.timestamp = new Date();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={'Shipping address'} />
      <View style={styles.addressContainer}>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <AddressBox
              address={item}
              addressName={item.addressName}
              addressDetail={item.addressDetail}
              selected={selectedAddressIndex === item.id}
              onSelect={() => handleAddressBoxSelect(item.id)}
            />
          )}
          contentContainerStyle={styles.flatlist}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <AddCircleButton screenName={'AddShippingAddress'} />
    </SafeAreaView>
  );
}

export default ShippingAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressContainer: {
    flex: 1,
    marginTop: 32,
  },
  flatlist: {
    paddingBottom: 40,
    gap: 40,
  },
});
