import React, { JSX } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {
  forwardedRef: React.Ref<TextInput>;
  title: string;
  inputHeight: number;
  value: string;
  onChangeText: (newText: string) => void;
  onSubmit: () => void;
};

function AddBox({
  forwardedRef,
  title,
  inputHeight,
  value,
  onChangeText,
  onSubmit,
}: Props): JSX.Element {
  return (
    <View style={[styles.container, {height: inputHeight}]}>
      <Text style={styles.inputName}>{title}</Text>
      <TextInput
        style={styles.formInput}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={'#B3B3B3'}
        ref={forwardedRef}
        enablesReturnKeyAutomatically
        onSubmitEditing={onSubmit}
        blurOnSubmit={false}
      />
    </View>
  );
}

export default AddBox;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
  },
  disabledContainer: {
    backgroundColor: '#F5F5F5',
    pointerEvents: 'none',
  },
  inputName: {
    paddingHorizontal: 15,
    fontWeight: '400',
    fontSize: 12,
    color: '#909090',
  },
  formInput: {
    paddingHorizontal: 15,
    fontWeight: '400',
    fontSize: 16,
    color: '#242424',
  },
});
