import React, {JSX, useCallback} from 'react';
import {
  BackHandler,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BlackButton from '../component/BlackButton';

function BoardingScreen(): JSX.Element {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        backHandler.remove();
      };
    }, []),
  );

  return (
    <ImageBackground
      source={require('../assets/png/boardingScreen/background.png')}
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>DEPAUW{'\n'}TIGER TRADE</Text>
          <Text style={styles.baseText}>
            The best simple place where you{'\n'}discover most wonderful
            furnitures and{'\n'}make your room beautiful
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.button}>
          <BlackButton title={'Get Started'} />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default BoardingScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    marginTop: 52,
    marginLeft: 32,
    marginRight: 25,
    gap: 24,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 32,
    color: '#242424',
  },
  baseText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#909090',
  },
  button: {
    marginHorizontal: 32,
    marginBottom: 24,
  },
});
