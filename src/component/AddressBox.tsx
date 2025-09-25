import React, { JSX } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import {realmContext} from '../realm/RealmContext';
import {ShippingAddress} from '../realm/ShippingAddress';

type Props = {
  address: ShippingAddress;
  addressName: string;
  addressDetail: string;
  selected: boolean;
  onSelect: () => void;
};

const {useRealm} = realmContext;

function AddressBox({
  address,
  addressName,
  addressDetail,
  selected,
  onSelect,
}: Props): JSX.Element {
  const realm = useRealm();

  const handleCheckboxChange = () => {
    onSelect();
  };

  const removeShippingAddress = () => {
    realm.write(() => {
      realm.delete(address);
    });
  };

  return (
    <View style={styles.addressBox}>
      <View style={styles.addressChoice}>
        <View style={styles.addressOption}>
          <CheckBox
            value={selected}
            onValueChange={handleCheckboxChange}
            tintColors={{true: '#242424'}}
          />
          <Text style={selected ? styles.useAddress : styles.notUseAddress}>
            Use as the shipping address
          </Text>
        </View>
        <TouchableOpacity onPress={removeShippingAddress}>
          <Feather name={'x-circle'} size={24} color={'#242424'} />
        </TouchableOpacity>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.name}>{addressName}</Text>
        <View style={styles.seperator} />
        <Text style={styles.address}>{addressDetail} </Text>
      </View>
    </View>
  );
}

export default AddressBox;

const styles = StyleSheet.create({
  addressBox: {
    marginHorizontal: 20,
    gap: 12,
  },
  addressChoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  useAddress: {
    fontWeight: '400',
    fontSize: 18,
    color: '#242424',
  },
  notUseAddress: {
    fontWeight: '400',
    fontSize: 18,
    color: '#909090',
  },
  addressContainer: {
    height: 119,
    gap: 12,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
  name: {
    paddingHorizontal: 16,
    paddingTop: 15,
    fontWeight: '600',
    fontSize: 18,
    color: '#242424',
  },
  seperator: {
    marginHorizontal: 12,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  address: {
    paddingHorizontal: 16,
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
});
