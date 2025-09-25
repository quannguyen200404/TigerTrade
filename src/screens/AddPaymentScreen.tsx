import React, {JSX, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Text,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';
import {UpdateMode} from 'realm';
import {realmContext} from '../realm/RealmContext';
import {PaymentMethod} from '../realm/PaymentMethod';
import ScreenTitle from '../component/ScreenTitle';
import AddPaymentCard from '../component/AddPaymentCard';
import AddBox from '../component/AddBox';
import BlackButton from '../component/BlackButton';

const {useRealm} = realmContext;

function AddPaymentMethodScreen(): JSX.Element {
  const realm = useRealm();
  const navigation = useNavigation();
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [CVV, setCVV] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const cardHolderNameRef = useRef<TextInput>(null);
  const CVVRef = useRef<TextInput>(null);
  const expirationDateRef = useRef<TextInput>(null);

  const data = [
    {key: '1', value: 'Mastercard'},
    {key: '2', value: 'Visa'},
  ];
  const isExist =
    realm.objects('PaymentMethod').filtered(`id = '${cardNumber}'`).length > 0;

  const handleCardNumberChange = (newText: string) => {
    const sanitizedText = newText.replace(/[^0-9]/g, '').slice(0, 16);
    setCardNumber(sanitizedText);
  };

  const handleCardNumberSubmit = () => {
    const censoredText = cardNumber.replace(/.{12}/g, '**** **** **** ');
    setCardNumber(censoredText);
    cardHolderNameRef.current?.focus();
  };

  const handleCardHolderNameSubmit = () => {
    CVVRef.current?.focus();
  };

  const handleCVVSubmit = () => {
    expirationDateRef.current?.focus();
  };

  const handleExpiryDateChange = (newText: string) => {
    const formattedText = newText.replace(/\D/g, '');

    const month = formattedText.slice(0, 2);
    const year = formattedText.slice(2, 4);

    let adjustedMonth = month;
    if (month.length === 2) {
      const monthNumber = parseInt(month, 10);
      if (monthNumber > 12) {
        adjustedMonth = '12';
      }
    }

    const formattedExpiryDate = `${adjustedMonth}/${year}`;
    setExpiryDate(formattedExpiryDate);
  };

  const handleExpirationDateSubmit = () => {
    expirationDateRef.current?.blur();
  };

  const addPaymentMethod = () => {
    if (!isExist) {
      realm.write(() => {
        realm.create<PaymentMethod>(
          'PaymentMethod',
          {
            id: cardNumber,
            timestamp: new Date(),
            cardType: cardType,
            cardNumber: cardNumber,
            cardHolderName: cardHolderName,
            cardExpiryDate: expiryDate,
          },
          UpdateMode.Modified,
        );
      });
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={'Add payment method'} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <AddPaymentCard />
          <SelectList
            setSelected={(val: React.SetStateAction<string>) =>
              setCardType(val)
            }
            data={data}
            save="value"
          />
          <View style={styles.cardNumber}>
            <Text style={styles.inputName}>Card Number</Text>
            <TextInput
              ref={null}
              style={styles.formInput}
              onChangeText={handleCardNumberChange}
              value={cardNumber}
              maxLength={19}
              keyboardType="numeric"
              enablesReturnKeyAutomatically
              blurOnSubmit={false}
              onSubmitEditing={handleCardNumberSubmit}
            />
          </View>
          <AddBox
            forwardedRef={cardHolderNameRef}
            title={'CardHolder Name'}
            inputHeight={62}
            value={cardHolderName}
            onChangeText={setCardHolderName}
            onSubmit={handleCardHolderNameSubmit}
          />
          <View style={styles.addDetail}>
            <View style={styles.addDetailWidth}>
              <AddBox
                forwardedRef={CVVRef}
                title={'CVV'}
                inputHeight={66}
                value={CVV}
                onChangeText={setCVV}
                onSubmit={handleCVVSubmit}
              />
            </View>
            <View style={styles.addDetailWidth}>
              <View style={styles.cardExpiryDate}>
                <Text style={styles.inputName}>Expiration Date</Text>
                <TextInput
                  ref={expirationDateRef}
                  style={styles.formInput}
                  onChangeText={handleExpiryDateChange}
                  value={expiryDate}
                  maxLength={5}
                  keyboardType="numeric"
                  enablesReturnKeyAutomatically
                  blurOnSubmit={false}
                  onSubmitEditing={handleExpirationDateSubmit}
                />
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={addPaymentMethod} style={styles.button}>
          <BlackButton title={'Add new card'} />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddPaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  form: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 32,
    paddingBottom: 38,
    gap: 38,
  },
  cardNumber: {
    paddingVertical: 10,
    height: 62,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
  },
  inputName: {
    paddingHorizontal: 15,
    fontWeight: '400',
    fontSize: 12,
    color: '#909090',
  },
  formInput: {
    paddingHorizontal: 15,
    fontWeight: '400',
    fontSize: 16,
    color: '#242424',
  },
  addDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addDetailWidth: {
    width: 157,
  },
  cardExpiryDate: {
    paddingVertical: 10,
    height: 66,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
});
