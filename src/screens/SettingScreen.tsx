import React, {JSX, useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import {realmContext} from '../realm/RealmContext';
import {User} from '../realm/User';
import ScreenTitle from '../component/ScreenTitle';
import SettingBox from '../component/SettingBox';
import NotificationButton from '../component/NotificationButton';
import HelpButton from '../component/HelpButton';
import SettingPassword from '../component/SettingPassword';
import SignOutButton from '../component/SignOutButton';
import DeleteUserButton from '../component/DeleteUserButton';

const {useRealm} = realmContext;

function SettingScreen(): JSX.Element {
  const realm = useRealm();
  const newestUser = realm.objects(User).sorted('timestamp', true)[0];
  const user = firebase.auth().currentUser;
  const userName = user?.displayName || '';
  const userEmail = user?.email || '';
  const [username, setUsername] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState(newestUser.password);
  const textInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleIconClick = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleNameSubmit = () => {
    user?.updateProfile({displayName: username});
    realm.write(() => {
      newestUser.username = username;
    });
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  const handleEmailSubmit = () => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      userEmail,
      password,
    );
    if (user) {
      user.reauthenticateWithCredential(credential).then(() => {
        user?.updateEmail(email);
        realm.write(() => {
          newestUser.email = email;
        });
        if (emailInputRef.current) {
          emailInputRef.current.blur();
        }
      });
    }
  };

  const handlePasswordClick = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handlePasswordSubmit = () => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      userEmail,
      newestUser.password,
    );
    if (user) {
      user.reauthenticateWithCredential(credential).then(() => {
        user?.updatePassword(password);
        realm.write(() => {
          newestUser.password = password;
        });
        if (passwordInputRef.current) {
          passwordInputRef.current.blur();
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={'Setting'} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.settingContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.contentTitle}>
              <Text style={styles.titleText}>Personal information</Text>
              <Pressable onPress={handleIconClick}>
                <Feather name={'edit'} size={17} color="#242424" />
              </Pressable>
            </View>
            <View style={styles.settingBox}>
              <SettingBox
                title={'Name'}
                onSubmit={handleNameSubmit}
                forwardedRef={textInputRef}
                value={username}
                onChangeText={setUsername}
              />
              <SettingBox
                title={'Email'}
                onSubmit={handleEmailSubmit}
                forwardedRef={emailInputRef}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.contentTitle}>
              <Text style={styles.titleText}>Password</Text>
              <Pressable onPress={handlePasswordClick}>
                <Feather name={'edit'} size={17} color="#242424" />
              </Pressable>
            </View>
            <SettingPassword
              onSubmit={handlePasswordSubmit}
              forwardedRef={passwordInputRef}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.notificationContainer}>
            <Text style={styles.titleText}>Notification</Text>
            <NotificationButton title={'Sales'} />
            <NotificationButton title={'New arrivals'} />
            <NotificationButton title={'Delivery status changes'} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Help center</Text>
            <View style={styles.helpBox}>
              <HelpButton title={'FAQ'} />
              <HelpButton title={'Contact Us'} />
              <HelpButton title={'Privacy & Terms'} />
              <SignOutButton />
              <DeleteUserButton />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  settingContainer: {
    marginHorizontal: 20,
    marginTop: 28,
    paddingBottom: 10,
    gap: 40,
  },
  contentContainer: {
    gap: 12,
  },
  contentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#909090',
  },
  settingBox: {
    gap: 16,
  },
  notificationContainer: {
    gap: 16,
  },
  helpBox: {
    gap: 10,
  },
});
