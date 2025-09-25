import React, { JSX } from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string;
};

function BlackButton({title}: Props): JSX.Element {
  return (
    <View style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );
}

export default BlackButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 8,
    backgroundColor: '#242424',
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 16,
    color: 'white',
  },
});
