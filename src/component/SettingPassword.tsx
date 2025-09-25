import React, { JSX } from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import useTogglePasswordVisibility from '../hook/useTogglePasswordVisibility';

type Props = {
  value: string;
  onSubmit: () => void;
  forwardedRef: React.Ref<TextInput>;
  onChangeText: (newText: string) => void;
};

function SettingBox({
  value,
  onSubmit,
  forwardedRef,
  onChangeText,
}: Props): JSX.Element {
  const {passwordVisibility} = useTogglePasswordVisibility();

  return (
    <View style={styles.container}>
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
  );
}

export default SettingBox;

const styles = StyleSheet.create({
  container: {
    height: 48,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  formInput: {
    paddingHorizontal: 15,
    fontWeight: '400',
    fontSize: 14,
    color: '#242424',
  },
});
