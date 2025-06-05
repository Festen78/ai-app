import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';

type Event = {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
};

type EventListProps = {
  events: Event[];
};

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun événement pour cette date</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {events.map((event) => (
        <TouchableOpacity key={event.id} style={styles.eventCard} activeOpacity={0.8}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{event.startTime}</Text>
            <View style={styles.timeLine} />
            <Text style={styles.timeText}>{event.endTime}</Text>
          </View>
          
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            
            <View style={styles.eventMetaRow}>
              <Clock size={14} color="#8E8E93" style={styles.icon} />
              <Text style={styles.eventMeta}>
                {event.startTime} - {event.endTime}
              </Text>
            </View>
            
            <View style={styles.eventMetaRow}>
              <MapPin size={14} color="#8E8E93" style={styles.icon} />
              <Text style={styles.eventMeta}>{event.location}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeContainer: {
    alignItems: 'center',
    marginRight: 12,
    width: 50,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
  },
  timeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E5E5EA',
    marginVertical: 4,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 4,
  },
  eventMeta: {
    fontSize: 14,
    color: '#8E8E93',
  },
});