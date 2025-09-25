import React, { JSX } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  screenName: any;
};

function AddCircleButton({screenName}: Props): JSX.Element {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screenName)}
      style={styles.button}>
      <Feather name={'plus'} size={25} color={'black'} />
    </TouchableOpacity>
  );
}

export default AddCircleButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 16,
    width: 52,
    height: 52,
    borderRadius: 40,
    elevation: 8,
    backgroundColor: 'white',
  },
});
