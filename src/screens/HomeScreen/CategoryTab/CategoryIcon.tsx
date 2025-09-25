import React, { JSX } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TableIcon from '../../../assets/svg/categoryIcon/TableIcon';

type Props = {
  categoryName: string;
  isFirstIndex: boolean;
  onPress: () => void;
  backgroundColor: string;
  iconColor: string;
  color: string;
};

function CategoryIcon({
  categoryName,
  isFirstIndex,
  onPress,
  backgroundColor,
  iconColor,
  color,
}: Props): JSX.Element {
  const marginStyle = {
    marginLeft: !isFirstIndex ? 29 : 0,
  };

  let categoryRender: JSX.Element | null = null;

  if (categoryName === 'Popular') {
    categoryRender = <Ionicons name={'star'} size={20} color={iconColor} />;
  } else if (categoryName === 'Chair') {
    categoryRender = (
      <FontAwesome5 name={'chair'} size={20} color={iconColor} />
    );
  } else if (categoryName === 'Table') {
    categoryRender = <TableIcon stroke={iconColor} fill={iconColor} />;
  } else if (categoryName === 'Armchair') {
    categoryRender = (
      <MaterialCommunityIcons
        name={'chair-rolling'}
        size={24}
        color={iconColor}
      />
    );
  } else if (categoryName === 'Bed') {
    categoryRender = <Ionicons name={'bed'} size={24} color={iconColor} />;
  } else {
    categoryRender = (
      <MaterialCommunityIcons name={'floor-lamp'} size={25} color={iconColor} />
    );
  }
  return (
    <View style={[styles.category, marginStyle]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.backgroundBox, {backgroundColor}]}>
        {categoryRender}
      </TouchableOpacity>
      <Text style={[styles.categoryText, {color}]}>{categoryName}</Text>
    </View>
  );
}

export default CategoryIcon;

const styles = StyleSheet.create({
  category: {
    alignItems: 'center',
  },
  backgroundBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  categoryText: {
    fontWeight: '400',
    fontSize: 14,
  },
});
