import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = StackScreenProps<RootStackParamList, 'Chat'>;

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: any;
  createdAt: Date;
}

const ChatScreen: React.FC<Props> = ({navigation}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const currentUser = firebase.auth().currentUser;
  const currentUserId = currentUser?.uid || 'anonymous';
  const currentUserName = currentUser?.displayName || 'Anonymous User';

  const allowedUIDs = useMemo(() => ['3iITYMnEfkTmBaEZ569qifqJvBx1', 'sE8Pv4i191R7K9nmUOM9huRBKo13'], []);
  
  const chatId = allowedUIDs.sort().join('_');

  useEffect(() => {
    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in to use chat');
      navigation.goBack();
      return;
    }

    if (!allowedUIDs.includes(currentUserId)) {
      Alert.alert(
        'Access Denied', 
        'You are not authorized to access this chat.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
      return;
    }

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        snapshot => {
          const messageList: Message[] = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            messageList.push({
              id: doc.id,
              text: data.text,
              senderId: data.senderId,
              senderName: data.senderName,
              timestamp: data.timestamp,
              createdAt: data.timestamp?.toDate() || new Date(),
            });
          });
          setMessages(messageList);
          setLoading(false);
        },
        error => {
          console.error('Error fetching messages:', error);
          setLoading(false);
        },
      );

    return unsubscribe;
  }, [chatId, currentUser, navigation, allowedUIDs, currentUserId]);

  const sendMessage = useCallback(async () => {
    if (inputText.trim() === '') return;

    const messageData = {
      text: inputText.trim(),
      senderId: currentUserId,
      senderName: currentUserName,
      timestamp: firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(messageData);

      await firestore()
        .collection('chats')
        .doc(chatId)
        .set(
          {
            participants: allowedUIDs,
            lastMessage: inputText.trim(),
            lastMessageTime: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          {merge: true},
        );

      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  }, [inputText, currentUserId, currentUserName, chatId, allowedUIDs]);

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const renderMessage = ({item}: {item: Message}) => {
    const isCurrentUser = item.senderId === currentUserId;
    
    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}>
        <View
          style={[
            styles.messageBubble,
            isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
          ]}>
          {!isCurrentUser && (
            <Text style={styles.senderName}>{item.senderName}</Text>
          )}
          <Text
            style={[
              styles.messageText,
              isCurrentUser ? styles.currentUserText : styles.otherUserText,
            ]}>
            {item.text}
          </Text>
          <Text
            style={[
              styles.timestamp,
              isCurrentUser ? styles.currentUserTimestamp : styles.otherUserTimestamp,
            ]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading chat...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#242424" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Private Chat</Text>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        inverted
        showsVerticalScrollIndicator={false}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#909090"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={[
            styles.sendButton,
            inputText.trim() === '' ? styles.disabledButton : styles.enabledButton,
          ]}
          disabled={inputText.trim() === ''}>
          <Ionicons 
            name="send" 
            size={20} 
            color={inputText.trim() === '' ? '#909090' : 'white'} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#242424',
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  messageContainer: {
    marginVertical: 4,
  },
  currentUserMessage: {
    alignItems: 'flex-end',
  },
  otherUserMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  currentUserBubble: {
    backgroundColor: '#242424',
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  currentUserText: {
    color: 'white',
  },
  otherUserText: {
    color: '#242424',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  currentUserTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherUserTimestamp: {
    color: '#909090',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
    backgroundColor: '#f8f8f8',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enabledButton: {
    backgroundColor: '#242424',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
});
