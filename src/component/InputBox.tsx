import React, { JSX } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {
  title: string;
  onSubmit: () => void;
  forwardedRef: React.Ref<TextInput>;
  value: string;
  onChangeText: (newText: string) => void;
};

function InputBox({
  title,
  onSubmit,
  forwardedRef,
  value,
  onChangeText,
}: Props): JSX.Element {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.inputName}>{title}</Text>
      <TextInput
        style={styles.formInput}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmit}
        ref={forwardedRef}
        enablesReturnKeyAutomatically
        blurOnSubmit={false}
      />
    </View>
  );
}

export default InputBox;

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
  },
  inputName: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 12,
    color: '#909090',
  },
  formInput: {
    fontWeight: '400',
    fontSize: 16,
    color: '#242424',
  },
});
