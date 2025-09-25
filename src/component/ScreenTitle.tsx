import React, { JSX } from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string;
};

function ScreenTitle({title}: Props): JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerName}>{title}</Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name={'chevron-back'} size={25} color="#242424" />
      </Pressable>
    </View>
  );
}

export default ScreenTitle;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    height: 24,
    marginTop: 12,
  },
  headerName: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#242424',
  },
  backButton: {
    position: 'absolute',
    marginHorizontal: 22,
  },
});
