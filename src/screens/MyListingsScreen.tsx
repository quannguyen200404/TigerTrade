import React, {JSX} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {realmContext} from '../realm/RealmContext';
import {Listing} from '../realm/Listing';
import {useNavigation} from '@react-navigation/native';
import {BSON} from 'realm';
import AddCircleButton from '../component/AddCircleButton';
import ScreenTitle from '../component/ScreenTitle';

const {useQuery, useRealm} = realmContext;

const ListingItem = ({
  item,
  onDelete,
  onEdit,
}: {
  item: Listing;
  onDelete: (id: BSON.ObjectId) => void;
  onEdit: (id: BSON.ObjectId) => void;
}) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemDetails}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </View>
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(item._id)}>
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(item._id)}>
        <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

function MyListingsScreen(): JSX.Element {
  const realm = useRealm();
  const navigation = useNavigation();

  const listings = useQuery(Listing).sorted('createdAt', true);

  const handleEdit = (listingId: BSON.ObjectId) => {
    navigation.navigate('CreateListing', {listingId: listingId.toHexString()});
  };

  const handleDelete = (listingId: BSON.ObjectId) => {
    Alert.alert(
      'Delete Listing',
      'Are you sure you want to delete this item?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const listingToDelete = realm.objectForPrimaryKey(Listing, listingId);
            if (listingToDelete) {
              realm.write(() => {
                realm.delete(listingToDelete);
              });
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={'Your Items for Sale'} />

      {listings.length === 0 ? (
        <View style={styles.emptyScreenContainer}>
          <Text style={styles.emptyText}>You haven't listed any items yet.</Text>
          <Text style={styles.emptySubText}>Press the button below to get started!</Text>
        </View>
      ) : (
        <View style={styles.addressContainer}>
          <FlatList
            data={listings}
            keyExtractor={item => item._id.toHexString()}
            renderItem={({item}) => (
              <ListingItem
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
            contentContainerStyle={styles.flatlist}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      <AddCircleButton screenName={'CreateListing'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressContainer: {
    flex: 1,
    marginTop: 32,
  },
  flatlist: {
    paddingBottom: 40,
    gap: 40,
  },
  emptyScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
    marginTop: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actionsContainer: {
    marginLeft: 10,
  },
  actionButton: {
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  deleteText: {
    color: '#FF3B30',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  emptySubText: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 8,
  },
  footer: {
    // kept for compatibility but AddCircleButton now handles spacing
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },

});

export default MyListingsScreen;