import React, {JSX, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import {UpdateMode} from 'realm';
import {realmContext} from '../realm/RealmContext';
import {User} from '../realm/User';
import notifee, {AndroidImportance} from '@notifee/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconStart from '../component/IconStart';
import InputBox from '../component/InputBox';
import PasswordBox from '../component/PasswordBox';
import BlackButton from '../component/BlackButton';

const {useRealm} = realmContext;

function SignUpScreen(): JSX.Element {
  const navigation = useNavigation();
  const realm = useRealm();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordCheckInputRef = useRef<TextInput>(null);

  async function onDisplayNotification() {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Account Status',
      body: 'You have successfully created an account.',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const isValidEmail = (validEmail: string) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(validEmail);
  };

  const handleNameSubmit = () => {
    setUsernameError('');
    emailInputRef.current?.focus();
  };
  const handleEmailSubmit = () => {
    setEmailError('');
    passwordInputRef.current?.focus();
  };
  const handlePasswordSubmit = () => {
    setPasswordError('');
    passwordCheckInputRef.current?.focus();
  };
  const handlePasswordCheckSubmit = () => {
    setPasswordCheckError('');
    passwordCheckInputRef.current?.blur();
  };

  const handleSignUp = () => {
    if (!username) {
      setUsernameError('Please enter your name.');
      return;
    }
    setUsernameError('');

    if (!email) {
      setEmailError('Please enter your email.');
      return;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email.');
      return;
    }
    setEmailError('');

    if (!password) {
      setPasswordError('Please enter a password.');
      return;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    setPasswordError('');

    if (!passwordCheck) {
      setPasswordCheckError('Please enter the password again.');
      return;
    } else if (password !== passwordCheck) {
      setPasswordCheckError('Password is not the same.');
      return;
    }
    setPasswordCheckError('');

    if (password === passwordCheck) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = firebase.auth().currentUser;
          if (user) {
            user.updateProfile({
              displayName: username,
            });
            const uid = user.uid;
            realm.write(() => {
              realm.create<User>(
                'User',
                {
                  id: uid,
                  timestamp: new Date(),
                  username: username,
                  email: email,
                  password: password,
                },
                UpdateMode.Modified,
              );
            });
          }
        });
      navigation.navigate('Loading');
      onDisplayNotification();
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.pattern}>
          <IconStart />
        </View>
        <Text style={styles.titleText}>WELCOME</Text>
        <View style={styles.loginForm}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <InputBox
                title={'Name'}
                onSubmit={handleNameSubmit}
                forwardedRef={null}
                value={username}
                onChangeText={setUsername}
              />
              <Ionicons name={'chevron-down'} size={20} color="#232323" />
            </View>
            {usernameError && (
              <Text style={styles.errorText}>{usernameError}</Text>
            )}
            <View style={styles.inputContainer}>
              <InputBox
                title={'Email'}
                onSubmit={handleEmailSubmit}
                forwardedRef={emailInputRef}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            <PasswordBox
              title={'Password'}
              onSubmit={handlePasswordSubmit}
              forwardedRef={passwordInputRef}
              value={password}
              onChangeText={setPassword}
            />
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
            <PasswordBox
              title={'Confirm password'}
              onSubmit={handlePasswordCheckSubmit}
              forwardedRef={passwordCheckInputRef}
              value={passwordCheck}
              onChangeText={setPasswordCheck}
            />
            {passwordCheckError && (
              <Text style={styles.errorText}>{passwordCheckError}</Text>
            )}
            <View style={styles.bottom}>
              <TouchableOpacity onPress={handleSignUp}>
                <BlackButton title={'Sign up'} />
              </TouchableOpacity>
              <View style={styles.signUpBox}>
                <Text style={styles.baseText}> Already have account? </Text>
                <Pressable onPress={() => navigation.goBack()}>
                  <Text style={styles.innerText}>Sign in</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bothold} />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pattern: {
    alignSelf: 'center',
  },
  titleText: {
    marginTop: 44,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 32,
    color: '#242424',
  },
  loginForm: {
    marginTop: 32,
    marginHorizontal: 24,
    height: 520,
    elevation: 4,
    backgroundColor: 'white',
  },
  form: {
    marginVertical: 40,
    gap: 16,
  },
  errorText: {
    marginHorizontal: 35,
    fontWeight: '400',
    fontSize: 16,
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingLeft: 15,
    paddingRight: 17,
    height: 66,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
  },
  bottom: {
    marginHorizontal: 20,
    marginTop: 16,
    gap: 16,
  },
  signUpBox: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  baseText: {
    fontWeight: '100',
    fontSize: 14,
    color: '#909090',
  },
  innerText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#303030',
  },
  bothold: {
    height: 50,
  },
});
