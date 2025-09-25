import React, { JSX } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  screenName: any;
  title: string;
  description: string;
};

function ProfileButton({screenName, title, description}: Props): JSX.Element {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screenName)}
      style={styles.button}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <Ionicons name={'chevron-forward'} size={25} style={styles.icon} />
    </TouchableOpacity>
  );
}

export default ProfileButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    borderRadius: 8,
    height: 80,
    backgroundColor: 'white',
  },
  textContainer: {
    marginLeft: 19,
    gap: 6,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#242424',
  },
  descriptionText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#909090',
  },
  icon: {
    marginRight: 18.25,
    color: '#242424',
  },
});
