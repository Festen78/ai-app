import { ActivityItem } from '@/types/activity';

// This is a mock service for demonstration purposes
// In a real app, this would fetch data from the backend

export async function getRecentActivities(): Promise<ActivityItem[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Newsletter envoyée',
          description: 'La newsletter hebdomadaire a été envoyée à 125 abonnés',
          date: new Date().toISOString(),
          status: 'success',
        },
        {
          id: '2',
          title: 'Email non délivré',
          description: 'Email de confirmation non délivré à user@example.com',
          date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          status: 'error',
        },
        {
          id: '3',
          title: 'Facture scannée',
          description: 'Nouvelle facture scannée du Café du Centre',
          date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          status: 'info',
        },
        {
          id: '4',
          title: 'Synchronisation',
          description: 'Synchronisation avec le workflow N8N réussie',
          date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          status: 'success',
        },
      ]);
    }, 1500);
  });
}