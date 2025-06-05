import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CalendarView from '@/components/calendar/CalendarView';
import EventList from '@/components/calendar/EventList';
import { useState } from 'react';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Demo events
  const events = [
    {
      id: '1',
      title: 'Réunion équipe',
      date: new Date(),
      startTime: '10:00',
      endTime: '11:00',
      location: 'Salle de conférence',
    },
    {
      id: '2',
      title: 'Déjeuner client',
      date: new Date(),
      startTime: '12:30',
      endTime: '14:00',
      location: 'Restaurant Le Central',
    },
    {
      id: '3',
      title: 'Appel avec fournisseur',
      date: new Date(Date.now() + 86400000), // tomorrow
      startTime: '15:00',
      endTime: '15:30',
      location: 'Zoom',
    },
  ];

  const filteredEvents = events.filter(
    event => 
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Calendrier</Text>
        <Text style={styles.description}>
          Consultez et gérez vos événements. Ces événements peuvent être synchronisés avec vos workflows N8N.
        </Text>
        
        <CalendarView 
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          events={events}
        />
        
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>
            Événements du {selectedDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
          </Text>
          <EventList events={filteredEvents} />
        </View>
        
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>
            Ce module est en cours de développement. La synchronisation avec N8N sera bientôt disponible.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000000',
  },
  description: {
    fontSize: 16,
    color: '#3C3C43',
    marginBottom: 16,
    lineHeight: 22,
  },
  eventsSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  noticeContainer: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginTop: 24,
  },
  noticeText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});