import React, {JSX, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {UpdateMode} from 'realm';
import {realmContext} from '../realm/RealmContext';
import {ShippingAddress} from '../realm/ShippingAddress';
import ScreenTitle from '../component/ScreenTitle';
import AddBox from '../component/AddBox';
import BlackButton from '../component/BlackButton';

const {useRealm} = realmContext;

function AddShippingAddressScreen(): JSX.Element {
  const realm = useRealm();
  const navigation = useNavigation();
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const addressRef = useRef<TextInput>(null);
  const zipcodeRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const districtRef = useRef<TextInput>(null);
  const isExist =
    realm.objects('ShippingAddress').filtered(`id = '${fullname}'`).length > 0;

  const handleFullnameSubmit = () => {
    addressRef.current?.focus();
  };

  const handleAddressSubmit = () => {
    zipcodeRef.current?.focus();
  };

  const handleZipcodeSubmit = () => {
    countryRef.current?.focus();
  };

  const handleCountrySubmit = () => {
    cityRef.current?.focus();
  };

  const handleCitySubmit = () => {
    districtRef.current?.focus();
  };

  const handleDistrictSubmit = () => {
    districtRef.current?.blur();
  };

  const addSaveAddress = () => {
    if (!isExist) {
      realm.write(() => {
        realm.create<ShippingAddress>(
          'ShippingAddress',
          {
            id: fullname,
            timestamp: new Date(),
            addressName: fullname,
            addressDetail:
              address +
              ', ' +
              zipcode +
              ', ' +
              country +
              ', ' +
              city +
              ', ' +
              district,
          },
          UpdateMode.Modified,
        );
      });
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={'Add shipping address'} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <AddBox
            forwardedRef={null}
            title={'Full name'}
            inputHeight={62}
            value={fullname}
            onChangeText={setFullname}
            onSubmit={handleFullnameSubmit}
          />
          <AddBox
            forwardedRef={addressRef}
            title={'Address'}
            inputHeight={62}
            value={address}
            onChangeText={setAddress}
            onSubmit={handleAddressSubmit}
          />
          <AddBox
            forwardedRef={zipcodeRef}
            title={'Zipcode (Postal Code)'}
            inputHeight={62}
            value={zipcode}
            onChangeText={setZipcode}
            onSubmit={handleZipcodeSubmit}
          />
          <AddBox
            forwardedRef={countryRef}
            title={'Country'}
            inputHeight={66}
            value={country}
            onChangeText={setCountry}
            onSubmit={handleCountrySubmit}
          />
          <AddBox
            forwardedRef={cityRef}
            title={'City'}
            inputHeight={66}
            value={city}
            onChangeText={setCity}
            onSubmit={handleCitySubmit}
          />
          <AddBox
            forwardedRef={districtRef}
            title={'District'}
            inputHeight={66}
            value={district}
            onChangeText={setDistrict}
            onSubmit={handleDistrictSubmit}
          />
        </View>
        <TouchableOpacity onPress={addSaveAddress} style={styles.button}>
          <BlackButton title={'Save address'} />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddShippingAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  form: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 32,
    gap: 20,
    paddingBottom: 20,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
});
