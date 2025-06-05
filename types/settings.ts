export interface AppSettings {
  apiUrl: string;
  apiKey: string;
  autoSync: boolean;
  notificationsEnabled: boolean;
  syncInterval: number;
  language: string;
  theme: 'light' | 'dark';
}