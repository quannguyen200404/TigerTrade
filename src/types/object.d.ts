import {ImageSourcePropType} from 'react-native';

type TProduct = {
  id: string;
  imageLink: ImageSourcePropType;
  productName: string;
  priceTag: number;
  quantity: number;
};

type TCategory = {
  id: string;
  categoryName: string;
  product: Array<TProduct>;
};
