import React, {JSX, useCallback, useEffect, useRef, useState} from 'react';
import {View, BackHandler, FlatList, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {TCategory, TProduct} from '../../../types/object';
import data from '../../../data/data';
import CategoryIcon from './CategoryIcon';
import ProductList from './ProductList';

type Props = {
  searchText: string;
};

function ParentCategory({searchText}: Props): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<TCategory>();
  const [listProduct, setListProduct] = useState<Array<TProduct>>([]);
  const productFlatListRef = useRef<FlatList<TProduct>>(null);

  useEffect(() => {
    setListProduct(selectedCategory?.product || []);
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedCategory(data[0]);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        subscription.remove();
      };
    }, []),
  );

  useEffect(() => {
    if (productFlatListRef.current) {
      productFlatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [selectedCategory]);

  const filteredList = listProduct.filter(item =>
    item.productName.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.category}>
        <FlatList
          data={data}
          contentContainerStyle={styles.categoryContent}
          renderItem={({item, index}) => {
            const backgroundColor =
              item.id === selectedCategory?.id ? '#242424' : '#F5F5F5';
            const iconColor =
              item.id === selectedCategory?.id ? 'white' : '#909090';
            const fontColor =
              item.id === selectedCategory?.id ? '#242424' : '#909090';
            return (
              <CategoryIcon
                isFirstIndex={index === 0}
                categoryName={item.categoryName}
                onPress={() => setSelectedCategory(item)}
                backgroundColor={backgroundColor}
                iconColor={iconColor}
                color={fontColor}
              />
            );
          }}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.product}>
        <ProductList
          listProduct={filteredList}
          flatListRef={productFlatListRef}
        />
      </View>
    </View>
  );
}

export default ParentCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    marginTop: 17,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  product: {
    flex: 1,
  },
});
