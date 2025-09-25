import React, { JSX } from 'react';
import {StyleSheet, View, Image, Text, ImageSourcePropType} from 'react-native';

type Props = {
  imageLink: ImageSourcePropType;
  title: string;
  description: string;
  status: string;
};

function NotificationBox({
  imageLink,
  title,
  description,
  status,
}: Props): JSX.Element {
  let statusElement: JSX.Element | null = null;

  if (status === 'new') {
    statusElement = <Text style={styles.new}>New</Text>;
  } else if (status === 'hot') {
    statusElement = <Text style={styles.hot}>Hot</Text>;
  }

  return (
    <View style={styles.notificationContainer}>
      <Image source={imageLink} style={styles.product} />
      <View style={styles.productDetail}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.detailBottom}>
          <Text style={styles.description}>{description}</Text>
          {statusElement}
        </View>
      </View>
    </View>
  );
}

export default NotificationBox;

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  product: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
  productDetail: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#242424',
  },
  detailBottom: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  description: {
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
  new: {
    fontWeight: '400',
    fontSize: 14,
    color: '#27EA60',
  },
  hot: {
    fontWeight: '400',
    fontSize: 14,
    color: '#EB5757',
  },
});
