import React, {JSX, RefObject} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TProduct} from '../../../types/object';
import Product from '../../../component/Product';

type Props = {
  listProduct: Array<TProduct>;
  flatListRef: RefObject<FlatList<TProduct> | null>;
};

function ProductList({listProduct, flatListRef}: Props): JSX.Element {
  return (
    <View style={styles.itemContainer}>
      <FlatList
        ref={flatListRef}
        data={listProduct}
        renderItem={({item}) => (
          <Product
            product={item}
            imageLink={item.imageLink}
            productName={item.productName}
            priceTag={item.priceTag}
          />
        )}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.column}
        keyExtractor={item => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
}

export default ProductList;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
  },
  container: {
    paddingTop: 19,
    gap: 16,
    paddingBottom: 16,
  },
  column: {
    gap: 21,
  },
});
