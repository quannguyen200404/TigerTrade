import React, {JSX, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UpdateMode} from 'realm';
import {realmContext} from '../realm/RealmContext';
import {User} from '../realm/User';
import notifee, {AndroidImportance} from '@notifee/react-native';
import IconStart from '../component/IconStart';
import InputBox from '../component/InputBox';
import PasswordBox from '../component/PasswordBox';
import BlackButton from '../component/BlackButton';

const {useRealm} = realmContext;

function LoginScreen(): JSX.Element {
  const navigation = useNavigation();
  const realm = useRealm();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordReset, setPasswordReset] = useState('');
  const passwordInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const lastSignedInUser = realm.objects(User).sorted('timestamp', true)[0];
    if (lastSignedInUser) {
      setEmail(lastSignedInUser.email);
      setPassword(lastSignedInUser.password);
    }
  }, [realm]);

  async function onDisplayNotification() {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Account Status',
      body: 'You have successfully logged in.',
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
    const emailRegex = /^[^\s@]+@depauw\.edu$/;
    return emailRegex.test(validEmail);
  };

  const handleEmailSubmit = () => {
    setEmailError('');
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handlePasswordSubmit = () => {
    setPasswordError('');
    if (passwordInputRef.current) {
      passwordInputRef.current.blur();
    }
  };

  const handleLogin = () => {
    setPasswordReset('');

    if (!email) {
      setEmailError('Please enter your email.');
      return;
    } else if (!isValidEmail(email)) {
      setEmailError('Please use a valid @depauw.edu email.');
      return;
    }
    setEmailError('');

    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    setPasswordError('');

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const checkUser = realm.objects(User).filtered(`email = "${email}"`)[0];
        if (checkUser) {
          realm.write(() => {
            checkUser.timestamp = new Date();
          });
        } else {
          const uid = firebase.auth().currentUser?.uid;
          const username =
            firebase.auth().currentUser?.displayName || undefined;
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
        onDisplayNotification();
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setEmailError('No account exists for this email.');
        } else {
          setPasswordError('Incorrect password.');
        }
      });
  };

  const handleResetPassword = () => {
    if (!email) {
      setEmailError('Please enter your email to reset password.');
      return;
    } else if (!isValidEmail(email)) {
      setEmailError('Please use a valid @depauw.edu email.');
      return;
    }
    setEmailError('');
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setPasswordReset('Password reset link sent to your email inbox.');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setEmailError('No account exists for this email.');
        }
      });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.pattern}>
          <IconStart />
        </View>
        <Text style={styles.titleText}>
          Hello! {'\n'}
          WELCOME BACK
        </Text>
        <View style={styles.loginForm}>
          <View style={styles.form}>
            <View style={styles.email}>
              <InputBox
                title={'Email'}
                onSubmit={handleEmailSubmit}
                forwardedRef={null}
                value={email}
                onChangeText={setEmail}
              />
              <Ionicons name={'chevron-down'} size={20} color="#232323" />
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
            <View style={styles.bottom}>
              <Pressable onPress={handleResetPassword}>
                <Text style={styles.pressForgot}>Forgot Password</Text>
              </Pressable>
              <TouchableOpacity onPress={handleLogin}>
                <BlackButton title={'Log in'} />
              </TouchableOpacity>
              <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.pressSignUp}>Sign up</Text>
              </Pressable>
            </View>
            {passwordReset && (
              <Text style={styles.resetText}>{passwordReset}</Text>
            )}
          </View>
        </View>
        <View style={styles.bothold} />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  pattern: {
    alignSelf: 'center',
  },
  titleText: {
    marginTop: 24,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 32,
    color: '#242424',
  },
  loginForm: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 24,
    elevation: 10,
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
  resetText: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    color: 'green',
  },
  email: {
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
    gap: 16,
  },
  pressForgot: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    color: '#303030',
  },
  pressSignUp: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    color: '#303030',
  },
  bothold: {
    height: 50,
  },
});
