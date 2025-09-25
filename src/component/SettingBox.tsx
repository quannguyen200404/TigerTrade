import React, { JSX } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {
  title: string;
  onSubmit: () => void;
  forwardedRef: React.Ref<TextInput>;
  value: string;
  onChangeText: (newText: string) => void;
};

function SettingBox({
  title,
  onSubmit,
  forwardedRef,
  value,
  onChangeText,
}: Props): JSX.Element {
  return (
    <View style={styles.container}>
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

export default SettingBox;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 11.5,
    height: 64,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  inputName: {
    paddingHorizontal: 15,
    fontWeight: '400',
    fontSize: 12,
    color: '#808080',
  },
  formInput: {
    paddingHorizontal: 15,
    fontWeight: '400',
    fontSize: 14,
    color: '#242424',
  },
});
