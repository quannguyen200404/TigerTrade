import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTab from '../tab/HomeTab';
import {
  LoadingScreen,
  BoardingScreen,
  LoginScreen,
  SignUpScreen,
  ProductDetailsScreen,
  CartScreen,
  CheckOutScreen,
  CongratsScreen,
  ReviewScreen,
  OrderScreen,
  ShippingAddressScreen,
  PaymentMethodScreen,
  MyReviewsScreen,
  AddShippingAddressScreen,
  AddPaymentScreen,
  SettingScreen,
} from '../../screens/';
import {firebase} from '@react-native-firebase/auth';
import {RootStackParamList} from '../../types/navigation';
import {navigationRef} from '../rootNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const AppStack = () => {
  const [authenticated, setAuthenticated] = useState(false);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  useEffect(() => {
    if (authenticated) {
      navigationRef.navigate('Home');
    } else {
      navigationRef.navigate('Boarding');
    }
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}
      initialRouteName="Loading">
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Boarding" component={BoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeTab} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="CheckOut" component={CheckOutScreen} />
      <Stack.Screen name="Congrats" component={CongratsScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="ShippingAddress" component={ShippingAddressScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
      <Stack.Screen
        name="AddShippingAddress"
        component={AddShippingAddressScreen}
      />
      <Stack.Screen name="AddPayment" component={AddPaymentScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
