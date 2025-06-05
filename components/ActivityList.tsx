import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ActivityItem } from '@/types/activity';

type ActivityListProps = {
  activities: ActivityItem[];
  loading: boolean;
};

export default function ActivityList({ activities, loading }: ActivityListProps) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#0A84FF" />
        <Text style={styles.loadingText}>Chargement des activités...</Text>
      </View>
    );
  }

  if (activities.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune activité récente</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {activities.map((activity) => (
        <View key={activity.id} style={styles.activityItem}>
          <View style={[styles.statusIndicator, getStatusColor(activity.status)]} />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityDescription}>{activity.description}</Text>
            <Text style={styles.activityDate}>
              {new Date(activity.date).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return styles.statusSuccess;
    case 'warning':
      return styles.statusWarning;
    case 'error':
      return styles.statusError;
    default:
      return styles.statusInfo;
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#8E8E93',
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  statusIndicator: {
    width: 4,
    backgroundColor: '#0A84FF',
  },
  statusSuccess: {
    backgroundColor: '#30D158',
  },
  statusWarning: {
    backgroundColor: '#FFD60A',
  },
  statusError: {
    backgroundColor: '#FF453A',
  },
  statusInfo: {
    backgroundColor: '#0A84FF',
  },
  activityContent: {
    flex: 1,
    padding: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  activityDescription: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 8,
  },
  activityDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
});