export interface RetryOptions {
  maxRetries: number;
  delay: number;
  backoff: boolean;
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const { maxRetries = 3, delay = 1000, backoff = true } = options;
  
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      if (lastError.message.includes('API key') || 
          lastError.message.includes('SAFETY') ||
          lastError.message.includes('QUOTA_EXCEEDED')) {
        throw lastError;
      }
      
      const waitTime = backoff ? delay * Math.pow(2, attempt) : delay;
      await new Promise<void>(resolve => setTimeout(() => resolve(), waitTime));
    }
  }
  
  throw lastError!;
}

export function formatErrorMessage(error: Error): string {
  const message = error.message.toLowerCase();
  
  if (message.includes('network') || message.includes('fetch')) {
    return '🌐 Network error. Please check your internet connection and try again.';
  }
  
  if (message.includes('api key')) {
    return '🔑 API key issue. Please check your Gemini API key configuration.';
  }
  
  if (message.includes('safety')) {
    return '🛡️ Content blocked for safety. Please try rephrasing your message.';
  }
  
  if (message.includes('quota')) {
    return '📊 API quota exceeded. Please try again later.';
  }
  
  if (message.includes('rate limit')) {
    return '⏱️ Rate limit reached. Please wait a moment before sending another message.';
  }
  
  return `❌ ${error.message}`;
}

export function validateMessage(message: string): { isValid: boolean; error?: string } {
  if (!message.trim()) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  if (message.length > 500) {
    return { isValid: false, error: 'Message is too long (max 500 characters)' };
  }
  
  const suspiciousPatterns = [
    /(<script|javascript:|data:)/i,
    /(eval\(|exec\()/i,
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(message)) {
      return { isValid: false, error: 'Message contains invalid content' };
    }
  }
  
  return { isValid: true };
}

export function truncateResponse(text: string, maxLength: number = 1000): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '... (response truncated)';
}

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}