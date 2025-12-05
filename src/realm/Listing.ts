import {Realm} from '@realm/react';
import {BSON} from 'realm';

export class Listing extends Realm.Object<Listing> {
  _id!: BSON.ObjectId;
  title!: string;
  description?: string;
  price!: number;
  imageUrl?: string; // Storing image URI locally
  category!: string;
  ownerId!: string; // To associate with a User
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Listing',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      title: 'string',
      description: 'string?',
      price: 'double',
      imageUrl: 'string?',
      category: 'string',
      ownerId: 'string', // In a real app, this might link to a User object
      createdAt: {type: 'date', default: () => new Date()},
    },
    primaryKey: '_id',
  };
}