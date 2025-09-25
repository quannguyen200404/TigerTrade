import React, { JSX } from 'react';
import {StyleSheet, View} from 'react-native';
import IconLogin from '../assets/svg/IconLogin';

function IconStart(): JSX.Element {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.iconLine} />
      <IconLogin />
      <View style={styles.iconLine} />
    </View>
  );
}

export default IconStart;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 21,
  },
  iconLine: {
    width: 105,
    height: 1,
    backgroundColor: '#BDBDBD',
  },
});
