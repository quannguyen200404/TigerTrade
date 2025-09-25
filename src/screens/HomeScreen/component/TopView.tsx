import React, {Dispatch, SetStateAction, useState} from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SearchBar} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  searchText: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const TopView = ({searchText, setSearch}: Props) => {
  const navigation = useNavigation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <View>
      <View style={styles.titleBar}>
        <Pressable onPress={handleSearchPress}>
          <Ionicons name={'search-outline'} size={20} color="#909090" />
        </Pressable>
        <View>
          <Text style={styles.titleText}>DEPAUW</Text>
          <Text style={styles.baseText}>TIGER TRADE</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Cart')}>
          <Ionicons name={'cart-outline'} size={20} color="#909090" />
        </Pressable>
      </View>
      {isSearchVisible && (
        <SearchBar
          lightTheme
          searchIcon={false}
          inputContainerStyle={styles.inputSearchBar}
          containerStyle={styles.searchBar}
          inputStyle={styles.searchText}
          onChangeText={newText => setSearch(newText)}
          value={searchText}
          placeholder="Enter the product's name..."
          placeholderTextColor="#909090"
          round
        />
      )}
    </View>
  );
};

export default TopView;

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginLeft: 20,
    marginRight: 28,
  },
  titleText: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    color: '#909090',
  },
  baseText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#909090',
  },
  inputSearchBar: {
    elevation: 4,
    backgroundColor: 'white',
  },
  searchBar: {
    marginTop: 17,
    marginHorizontal: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    backgroundColor: 'white',
  },
  searchText: {
    color: '#909090',
  },
});
