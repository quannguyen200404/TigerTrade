import React, { JSX } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {firebase} from '@react-native-firebase/auth';
import {realmContext} from '../realm/RealmContext';
import {User} from '../realm/User';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {useRealm} = realmContext;

function DeleteUserButton(): JSX.Element {
  const realm = useRealm();

  const handleSignOut = () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userEmail = currentUser.email;
      const userToDelete = realm.objects(User).sorted('timestamp', true)[0];
      const userPassword = userToDelete.password;
      if (userEmail) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          userEmail,
          userPassword,
        );
        currentUser.reauthenticateWithCredential(credential).then(() => {
          realm.write(() => {
            realm.delete(userToDelete);
          });
          currentUser.delete();
        });
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut} style={styles.button}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Delete Account</Text>
      </View>
      <Ionicons name={'chevron-forward'} size={25} style={styles.icon} />
    </TouchableOpacity>
  );
}

export default DeleteUserButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  textContainer: {
    marginLeft: 19,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#242424',
  },
  icon: {
    marginRight: 18.25,
    color: '#242424',
  },
});
