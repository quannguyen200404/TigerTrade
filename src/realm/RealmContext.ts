import {createRealmContext} from '@realm/react';
import {FavoriteProduct} from './FavoriteProduct';
import {User} from './User';
import {ShippingAddress} from './ShippingAddress';
import {PaymentMethod} from './PaymentMethod';
import {Listing} from './Listing';

export const realmContext = createRealmContext({
  schema: [FavoriteProduct, User, ShippingAddress, PaymentMethod, Listing],
});
