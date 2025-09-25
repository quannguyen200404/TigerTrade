import React, {JSX, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BlackButton from '../component/BlackButton';
import {ScrollView} from 'react-native-gesture-handler';

function CongratsScreen(): JSX.Element {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home');
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        backHandler.remove();
      };
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <Text style={styles.success}>SUCCESS!</Text>
          <Image
            source={require('../assets/png/congratsScreen/success.png')}
            style={styles.image}
          />
          <Text style={styles.description}>
            Your order will be delivered soon.{'\n'}
            Thank you for choosing our app!
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Order')}>
            <BlackButton title={'Track your orders'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <BlackButton title={'Back to home'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CongratsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
    paddingBottom: 16,
  },
  success: {
    fontWeight: '600',
    fontSize: 32,
    color: '#303030',
  },
  image: {
    marginTop: 25,
    marginBottom: 27,
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    color: '#909090',
  },
  bottomContainer: {
    marginHorizontal: 24,
    marginBottom: 16,
    gap: 16,
  },
});
