import React, { JSX } from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import OrderBox from '../../../component/OrderBox';

function ProcessingRoute(): JSX.Element {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}>
      <OrderBox status={'processing'} />
      <OrderBox status={'processing'} />
      <OrderBox status={'processing'} />
    </ScrollView>
  );
}

export default ProcessingRoute;

const styles = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 37,
    gap: 1,
  },
});
