import React, {JSX, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import ParentCategory from './CategoryTab/ParentCategory';
import TopView from './component/TopView';

function HomeView(): JSX.Element {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TopView searchText={searchText} setSearch={setSearchText} />
      <ParentCategory searchText={searchText} />
    </SafeAreaView>
  );
}

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
