import {ImageSourcePropType} from 'react-native';
import Realm from 'realm';

export class FavoriteProduct extends Realm.Object<FavoriteProduct> {
  id!: string;
  imageLink!: ImageSourcePropType;
  productName!: string;
  priceTag!: number;
  quantity!: number;

  static schema: Realm.ObjectSchema = {
    name: 'FavoriteProduct',
    primaryKey: 'id',
    properties: {
      id: 'string',
      imageLink: 'mixed',
      productName: 'string',
      priceTag: 'int?',
      quantity: 'int?',
    },
  };
}
