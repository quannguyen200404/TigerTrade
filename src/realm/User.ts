import Realm from 'realm';

export class User extends Realm.Object<User> {
  id!: string;
  timestamp!: Date;
  username!: string;
  email!: string;
  password!: string;

  static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'string',
      timestamp: 'mixed',
      username: 'string',
      email: 'string',
      password: 'string',
    },
  };
}
