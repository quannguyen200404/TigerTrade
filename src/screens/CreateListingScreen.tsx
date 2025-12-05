import React, {JSX, useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {realmContext} from '../realm/RealmContext';
import {Listing} from '../realm/Listing';
import {BSON} from 'realm';
import {launchImageLibrary} from 'react-native-image-picker';
import {RootStackParamList} from '../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const {useRealm, useObject} = realmContext;

type Props = NativeStackScreenProps<RootStackParamList, 'CreateListing'>;

function CreateListingScreen({route, navigation}: Props): JSX.Element {
  const realm = useRealm();
  const {listingId} = route.params || {};
  const isEditMode = !!listingId;

  const existingListing = useObject(
    Listing,
    isEditMode ? new BSON.ObjectId(listingId) : new BSON.ObjectId(),
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && existingListing) {
      setTitle(existingListing.title);
      setDescription(existingListing.description || '');
      setPrice(existingListing.price.toString());
      setCategory(existingListing.category);
      setImageUri(existingListing.imageUrl || null);
    }
  }, [existingListing, isEditMode]);

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.7}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleSubmit = () => {
    if (!title || !price || !imageUri || !category) {
      Alert.alert('Error', 'Please fill in all required fields (*).');
      return;
    }
    setIsLoading(true);

    try {
      realm.write(() => {
        if (isEditMode && existingListing) {
          existingListing.title = title;
          existingListing.description = description;
          existingListing.price = parseFloat(price) || 0;
          existingListing.imageUrl = imageUri;
          existingListing.category = category;
        } else {
          realm.create('Listing', {
            _id: new BSON.ObjectId(),
            title: title,
            description: description,
            price: parseFloat(price) || 0,
            imageUrl: imageUri,
            category: category,
            ownerId: 'current-user-id',
            createdAt: new Date(),
          });
        }
      });

      Alert.alert('Success', `Item ${isEditMode ? 'updated' : 'listed'}!`);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save listing:', error);
      Alert.alert('Error', 'Failed to save the item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.label}>Upload Item Image *</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handleChoosePhoto}>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Tap to select image</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Product Title *</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g., Minimalist Desk Lamp" />

        <Text style={styles.label}>Category *</Text>
        <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="e.g., Chair, Table, Lamp" />
        
        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Describe your item..." multiline />

        <Text style={styles.label}>Price ($) *</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="e.g., 59.99" keyboardType="numeric" />

        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Button title={isEditMode ? 'Update My Item' : 'List My Item'} onPress={handleSubmit} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { padding: 20, paddingBottom: 40 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, fontSize: 16, backgroundColor: '#f9f9f9' },
  textArea: { height: 120, textAlignVertical: 'top' },
  imagePicker: { alignItems: 'center', marginBottom: 20 },
  imagePreview: { width: '100%', height: 200, borderRadius: 8, backgroundColor: '#e0e0e0' },
  imagePlaceholder: { width: '100%', height: 200, borderRadius: 8, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#ccc', borderStyle: 'dashed' },
  imagePlaceholderText: { color: '#888', fontSize: 16 },
  buttonContainer: { marginTop: 30 },
});


export default CreateListingScreen;