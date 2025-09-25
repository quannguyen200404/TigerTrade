import React, { JSX } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  status: string;
};

function OrderBox({status}: Props): JSX.Element {
  let statusElement: JSX.Element | null = null;

  if (status === 'delivered') {
    statusElement = <Text style={styles.delivered}>Delivered</Text>;
  } else if (status === 'processing') {
    statusElement = (
      <View style={styles.statusContainer}>
        <Feather name={'clock'} size={16} color={'#242424'} />
        <Text style={styles.processing}> Processing</Text>
      </View>
    );
  } else {
    statusElement = <Text style={styles.canceled}>Canceled</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.orderContainer}>
          <Text style={styles.name}>Order No238562312</Text>
          <Text style={styles.date}>20/03/2020</Text>
        </View>
        <View style={styles.seperator} />
        <View style={styles.orderContainer}>
          <Text style={styles.baseText}>
            Quantity:<Text style={styles.innerText}> 03</Text>
          </Text>
          <Text style={styles.baseText}>
            Total Amount:<Text style={styles.innerText}> $150</Text>
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Detail</Text>
        </TouchableOpacity>
        {statusElement}
      </View>
    </View>
  );
}

export default OrderBox;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    gap: 32,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
  top: {
    gap: 12,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  name: {
    fontWeight: '400',
    fontSize: 16,
    color: '#242424',
  },
  date: {
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
  seperator: {
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  baseText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
  innerText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#242424',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 36,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 78,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#242424',
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 16,
    color: 'white',
  },
  delivered: {
    fontWeight: '400',
    fontSize: 16,
    color: '#27AE60',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  processing: {
    fontWeight: '400',
    fontSize: 16,
    color: '#F2C94C',
  },
  canceled: {
    fontWeight: '400',
    fontSize: 16,
    color: '#EB5757',
  },
});
