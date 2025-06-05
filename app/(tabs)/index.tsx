import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import ModuleCard from '@/components/ModuleCard';
import { getRecentActivities } from '@/services/activityService';
import { ActivityItem } from '@/types/activity';
import ActivityList from '@/components/ActivityList';

export default function HomeScreen() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await getRecentActivities();
        setActivities(data);
      } catch (error) {
        console.error('Failed to load activities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.welcomeText}>Bienvenue sur N8N Connect</Text>
      <Text style={styles.subtitle}>Modules</Text>
      
      <View style={styles.modulesGrid}>
        <ModuleCard 
          title="Newsletter" 
          icon="bell" 
          route="/newsletter"
          color="#0A84FF"
          description="Gérer les paramètres de vos newsletters"
        />
        <ModuleCard 
          title="Emails" 
          icon="mail" 
          route="/emails"
          color="#5E5CE6"
          description="Configurer vos templates d'emails"
        />
        <ModuleCard 
          title="Calendrier" 
          icon="calendar" 
          route="/calendar"
          color="#FF9F0A"
          description="Gérer vos événements et rappels"
        />
        <ModuleCard 
          title="Scan" 
          icon="scan" 
          route="/scan"
          color="#30D158"
          description="Scanner et traiter vos factures"
        />
      </View>

      <Text style={styles.subtitle}>Activités récentes</Text>
      <ActivityList activities={activities} loading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    color: '#000000',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 24,
    color: '#000000',
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});