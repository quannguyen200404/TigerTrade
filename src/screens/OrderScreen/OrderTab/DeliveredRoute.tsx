import React, { JSX } from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import OrderBox from '../../../component/OrderBox';

function DeliveredRoute(): JSX.Element {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}>
      <OrderBox status={'delivered'} />
      <OrderBox status={'delivered'} />
      <OrderBox status={'delivered'} />
      <OrderBox status={'delivered'} />
      <OrderBox status={'delivered'} />
    </ScrollView>
  );
}

export default DeliveredRoute;

const styles = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 37,
    gap: 1,
  },
});
