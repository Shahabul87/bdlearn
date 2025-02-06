import { create } from 'zustand';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  read: boolean;
  createdAt: Date;
  sender: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface MessagesStore {
  messages: Message[];
  unreadCount: number;
  isLoading: boolean;
  fetchMessages: () => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
}

export const useMessages = create<MessagesStore>((set, get) => ({
  messages: [],
  unreadCount: 0,
  isLoading: false,

  fetchMessages: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get('/api/messages');
      const messages = response.data;
      const unreadCount = messages.filter((m: Message) => !m.read).length;
      set({ messages, unreadCount, isLoading: false });
    } catch (error) {
      console.error('Error fetching messages:', error);
      set({ isLoading: false });
    }
  },

  markAsRead: async (messageId: string) => {
    try {
      await axios.patch('/api/messages', { messageId });
      const messages = get().messages.map(message =>
        message.id === messageId ? { ...message, read: true } : message
      );
      const unreadCount = messages.filter(m => !m.read).length;
      set({ messages, unreadCount });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  },
})); 