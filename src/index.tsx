import React, {JSX, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {realmContext} from './realm/RealmContext';
import Navigator from './navigation';
import notifee, {AndroidImportance} from '@notifee/react-native';

import firebase from '@react-native-firebase/app';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyC2KnTuwWxN_a3_OM7ewajcH0NTPxfZZ28',
    authDomain: 'tiger-trade-f6e65.firebaseapp.com',
    projectId: 'tiger-trade-f6e65',
    storageBucket: 'tiger-trade-f6e65.firebasestorage.app',
    messagingSenderId: '158729852030',
    appId: '1:158729852030:android:790fd49c365e416c05742f',
  });
}

const {RealmProvider} = realmContext;

const displayNotifications = async (
  data: FirebaseMessagingTypes.RemoteMessage,
) => {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: data.notification?.title,
    body: data.notification?.body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
  });
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await displayNotifications(remoteMessage);
});

export default function App(): JSX.Element {
  useEffect(() => {
    const setupListeners = async () => {
      await messaging().requestPermission();

      const token = await messaging().getToken();
      console.log('FCM TOKEN =>', token);

      messaging()
        .getInitialNotification()
        .then(async remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived in the foreground!', remoteMessage);
        displayNotifications(remoteMessage);
      });

      return unsubscribe;
    };

    setupListeners();
  }, []);

  return (
    <RealmProvider>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </RealmProvider>
  );
}