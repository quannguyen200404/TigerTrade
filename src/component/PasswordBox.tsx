import React, { JSX } from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTogglePasswordVisibility from '../hook/useTogglePasswordVisibility';

type Props = {
  title: string;
  onSubmit: () => void;
  forwardedRef: React.Ref<TextInput>;
  value: string;
  onChangeText: (newText: string) => void;
};

function PasswordBox({
  title,
  onSubmit,
  forwardedRef,
  value,
  onChangeText,
}: Props): JSX.Element {
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  return (
    <View style={styles.password}>
      <View style={styles.passwordBox}>
        <Text style={styles.inputName}>{title}</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={onChangeText}
          secureTextEntry={passwordVisibility}
          value={value}
          onSubmitEditing={onSubmit}
          ref={forwardedRef}
          enablesReturnKeyAutomatically
          blurOnSubmit={false}
        />
      </View>
      <Pressable onPress={handlePasswordVisibility}>
        <Icon name={rightIcon} size={22} color="#232323" />
      </Pressable>
    </View>
  );
}

export default PasswordBox;

const styles = StyleSheet.create({
  password: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingLeft: 15,
    paddingRight: 16.25,
    height: 66,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
  },
  passwordBox: {
    flex: 1,
  },
  inputName: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 12,
    color: '#909090',
  },
  formInput: {
    maxWidth: 210,
    fontWeight: '400',
    fontSize: 16,
    color: '#242424',
  },
});
