import {NavigatorScreenParams} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';

export type HomeTabParamList = {
  House: undefined;
  Favorite: undefined;
  Notification: undefined;
  Profile: undefined;
};

export type OrderTabParamList = {
  Delivered: undefined;
  Processing: undefined;
  Canceled: undefined;
};

export type RootStackParamList = {
  Loading: undefined;
  Boarding: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: NavigatorScreenParams<HomeTabParamList> | undefined;
  ProductDetails: {
    item: TProduct;
    headerName: string;
    productPrice: number;
    imageSource: ImageSourcePropType;
  };
  Cart: undefined;
  CheckOut: {
    totalPrice: number;
  };
  Congrats: undefined;
  Review: {
    productName: string;
    imageLink: ImageSourcePropType;
  };
  Order: NavigatorScreenParams<OrderTabParamList> | undefined;
  ShippingAddress: undefined;
  PaymentMethod: undefined;
  MyReviews: undefined;
  AddShippingAddress: undefined;
  AddPayment: undefined;
  Setting: undefined;
};

declare global {
  namespace ReactNavigation {
    export interface RootParamList extends RootStackParamList {}
  }
}
