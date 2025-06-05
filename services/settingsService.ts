import { AppSettings } from '@/types/settings';

// This is a mock service for demonstration purposes
// In a real app, this would interact with device storage or a backend API

export async function getAppSettings(): Promise<AppSettings> {
  // Simulate loading from storage
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        apiUrl: 'https://n8n.example.com/webhook/',
        apiKey: 'demo_api_key_123',
        autoSync: true,
        notificationsEnabled: true,
        syncInterval: 15,
        language: 'fr',
        theme: 'light',
      });
    }, 800);
  });
}

export async function updateAppSettings(settings: AppSettings): Promise<boolean> {
  // Simulate saving to storage
  console.log('Saving settings:', settings);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful update
      resolve(true);
    }, 1000);
  });
}