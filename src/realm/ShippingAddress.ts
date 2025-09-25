import Realm from 'realm';

export class ShippingAddress extends Realm.Object<ShippingAddress> {
  id!: string;
  timestamp!: Date;
  addressName!: string;
  addressDetail!: string;

  static schema: Realm.ObjectSchema = {
    name: 'ShippingAddress',
    primaryKey: 'id',
    properties: {
      id: 'string',
      timestamp: 'mixed',
      addressName: 'string',
      addressDetail: 'string',
    },
  };
}
