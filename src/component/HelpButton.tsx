import React, { JSX } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string;
};

function HelpButton({title}: Props): JSX.Element {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Ionicons name={'chevron-forward'} size={25} style={styles.icon} />
    </TouchableOpacity>
  );
}

export default HelpButton;

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
