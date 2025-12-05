import React, {JSX, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {realmContext} from '../realm/RealmContext';
import {User} from '../realm/User';
import {ShippingAddress} from '../realm/ShippingAddress';
import {PaymentMethod} from '../realm/PaymentMethod';
import ProfileButton from '../component/ProfileButton';

const {useRealm} = realmContext;

function ProfileScreen(): JSX.Element {
  const realm = useRealm();
  const newestUser = realm.objects(User).sorted('timestamp', true)[0];
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [shippingAddressLength, setShippingAddressLength] = useState(0);
  const [paymentMethodLength, setPaymentMethodLength] = useState(0);

  useEffect(() => {
    realm.objects(User).addListener(() => {
      setUserName(newestUser.username);
      setUserEmail(newestUser.email);
    });

    realm.objects(ShippingAddress).addListener(addresses => {
      setShippingAddressLength(addresses.length);
    });

    realm.objects(PaymentMethod).addListener(methods => {
      setPaymentMethodLength(methods.length);
    });

    return () => {
      realm.removeAllListeners();
    };
  }, [newestUser.email, newestUser.username, realm]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerName}>Profile</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.userContainer}>
          <Image source={require('../assets/png/profileScreen/avatar.png')} />
          <View style={styles.accountDetails}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.email}>{userEmail}</Text>
          </View>
        </View>
        <View style={styles.optionContainer}>
          <ProfileButton
            screenName={'Order'}
            title={'My orders'}
            description={'Already have 3 orders'}
          />
          <ProfileButton
            screenName={'MyListings'}
            title={'My Listings'}
            description={'Manage your items for sale'}
          />
          <ProfileButton
            screenName={'ShippingAddress'}
            title={'Shipping Addresses'}
            description={
              shippingAddressLength +
              (shippingAddressLength < 2 ? ' Address' : ' Addresses')
            }
          />
          <ProfileButton
            screenName={'PaymentMethod'}
            title={'Payment Method'}
            description={
              'You have ' +
              paymentMethodLength +
              (paymentMethodLength < 2 ? ' card' : ' cards')
            }
          />
          <ProfileButton
            screenName={'MyReviews'}
            title={'My reviews'}
            description={'Reviews for 3 items'}
          />
          <ProfileButton
            screenName={'Setting'}
            title={'Setting'}
            description={'Notification, Password, FAQ, Contact'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    height: 24,
    marginTop: 12,
  },
  headerName: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#242424',
  },
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 26,
    marginHorizontal: 20,
    gap: 20,
  },
  accountDetails: {
    marginRight: 70,
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
    color: '#303030',
  },
  email: {
    fontWeight: '400',
    fontSize: 14,
    color: '#808080',
  },
  optionContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    paddingBottom: 15,
    gap: 15,
  },
});
