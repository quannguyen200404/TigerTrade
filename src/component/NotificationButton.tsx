import React, {JSX, useState} from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';

type Props = {
  title: string;
};

function NotificationButton({title}: Props): JSX.Element {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.button}>
      <Text style={styles.titleText}>{title}</Text>
      <Switch
        trackColor={{false: '#E0E0E0', true: '#27EA60'}}
        thumbColor={'white'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

export default NotificationButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    height: 54,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  titleText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#242424',
  },
});
