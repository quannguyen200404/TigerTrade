import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import geminiChatService from '../services/geminiChatService';
import { formatErrorMessage, validateMessage, generateMessageId, retryWithBackoff } from '../services/chatUtils';

type Props = StackScreenProps<RootStackParamList, 'ChatAI'>;

interface AIMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatAIScreen: React.FC<Props> = ({navigation}) => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if Gemini is configured
    const status = geminiChatService.getStatus();
    setIsConfigured(status.isConfigured);
    
    // Set initial message based on API configuration
    const initialMessage: AIMessage = {
      id: '1',
      text: status.isConfigured 
        ? 'Hello! I\'m your AI assistant. How can I help you today?'
        : 'AI Assistant is not configured. Please add your Gemini API key to the config file to start chatting.',
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  const sendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;

    // Validate message
    const validation = validateMessage(inputText);
    if (!validation.isValid) {
      const errorMessage: AIMessage = {
        id: generateMessageId(),
        text: validation.error!,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [errorMessage, ...prev]);
      return;
    }

    // Check if API is configured
    if (!isConfigured) {
      const errorMessage: AIMessage = {
        id: generateMessageId(),
        text: 'Please configure your Gemini API key in the config file to use the AI assistant.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [errorMessage, ...prev]);
      return;
    }

    const userMessage: AIMessage = {
      id: generateMessageId(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const messageText = inputText.trim();
    setMessages(prev => [userMessage, ...prev]);
    setInputText('');
    setIsLoading(true);

    try {
      // Use retry logic for better reliability
      const aiResponse = await retryWithBackoff(
        () => geminiChatService.sendMessage(messageText),
        { maxRetries: 2, delay: 1000 }
      );
      
      const aiMessage: AIMessage = {
        id: generateMessageId(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [aiMessage, ...prev]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      const errorMessage: AIMessage = {
        id: generateMessageId(),
        text: formatErrorMessage(error),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [errorMessage, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    geminiChatService.clearHistory();
    const initialMessage: AIMessage = {
      id: generateMessageId(),
      text: 'Chat history cleared. How can I help you?',
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const renderMessage = ({item}: {item: AIMessage}) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.aiMessage,
      ]}>
      <View
        style={[
          styles.messageBubble,
          item.isUser ? styles.userBubble : styles.aiBubble,
        ]}>
        {!item.isUser && (
          <Text style={styles.aiLabel}>AI Assistant</Text>
        )}
        <Text
          style={[
            styles.messageText,
            item.isUser ? styles.userText : styles.aiText,
          ]}>
          {item.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            item.isUser ? styles.userTimestamp : styles.aiTimestamp,
          ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#242424" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        {isConfigured && (
          <TouchableOpacity
            onPress={clearHistory}
            style={styles.clearButton}>
            <Ionicons name="refresh" size={20} color="#666" />
          </TouchableOpacity>
        )}
        <View style={styles.aiIndicator}>
          <View style={[
            styles.aiDot, 
            isConfigured ? styles.configuredDot : styles.demoDot
          ]} />
          <Text style={[
            styles.aiStatus, 
            isConfigured ? styles.configuredStatus : styles.demoStatus
          ]}>
            {isConfigured ? 'Online' : 'Not Configured'}
          </Text>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        inverted
        showsVerticalScrollIndicator={false}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBubble}>
            <Text style={styles.loadingText}>AI is thinking...</Text>
            <View style={styles.typingIndicator}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me anything..."
            placeholderTextColor="#909090"
            multiline
            maxLength={500}
          />
          <Text style={styles.characterCount}>
            {inputText.length}/500
          </Text>
        </View>
        <TouchableOpacity
          onPress={sendMessage}
          style={[
            styles.sendButton,
            (inputText.trim() === '' || isLoading) ? styles.disabledButton : styles.enabledButton,
          ]}
          disabled={inputText.trim() === '' || isLoading}>
          {isLoading ? (
            <Ionicons name="hourglass" size={20} color="white" />
          ) : (
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() === '' ? '#909090' : 'white'} 
            />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatAIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  clearButton: {
    padding: 8,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#242424',
    flex: 1,
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  aiStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
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
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#242424',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  aiLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: 'white',
  },
  aiText: {
    color: '#242424',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  aiTimestamp: {
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
  inputWrapper: {
    flex: 1,
    marginRight: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: '#f8f8f8',
  },
  characterCount: {
    fontSize: 11,
    color: '#909090',
    textAlign: 'right',
    marginTop: 4,
    marginRight: 8,
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
  loadingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loadingBubble: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 12,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  loadingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#909090',
    marginRight: 4,
  },
  configuredDot: {
    backgroundColor: '#4CAF50',
  },
  demoDot: {
    backgroundColor: '#FF9800',
  },
  configuredStatus: {
    color: '#4CAF50',
  },
  demoStatus: {
    color: '#FF9800',
  },
});