import Realm from 'realm';

export class PaymentMethod extends Realm.Object<PaymentMethod> {
  id!: string;
  timestamp!: Date;
  cardType!: string;
  cardNumber!: string;
  cardHolderName!: string;
  cardExpiryDate!: string;

  static schema: Realm.ObjectSchema = {
    name: 'PaymentMethod',
    primaryKey: 'id',
    properties: {
      id: 'string',
      timestamp: 'mixed',
      cardType: 'string',
      cardNumber: 'string',
      cardHolderName: 'string',
      cardExpiryDate: 'string',
    },
  };
}
