export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'success' | 'warning' | 'error' | 'info';
}