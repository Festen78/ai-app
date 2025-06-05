import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

type CalendarViewProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  events: any[];
};

export default function CalendarView({ selectedDate, onSelectDate, events }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  
  useEffect(() => {
    generateCalendarDays(currentMonth);
  }, [currentMonth]);
  
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    let dayOfWeek = firstDay.getDay();
    if (dayOfWeek === 0) dayOfWeek = 7; // Make Sunday the 7th day
    
    const daysInMonth = lastDay.getDate();
    
    // Array to hold all days to display
    const days: Date[] = [];
    
    // Add days from previous month to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = dayOfWeek - 1; i > 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i + 1));
    }
    
    // Add all days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Add days from next month to complete the last week
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }
    }
    
    setCalendarDays(days);
  };
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  const isSelectedDate = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };
  
  const hasEvents = (date: Date) => {
    return events.some(
      event => 
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <ChevronLeft size={24} color="#0A84FF" />
        </TouchableOpacity>
        
        <Text style={styles.monthTitle}>
          {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </Text>
        
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <ChevronRight size={24} color="#0A84FF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.weekdayHeader}>
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
          <Text key={index} style={styles.weekdayText}>{day}</Text>
        ))}
      </View>
      
      <View style={styles.daysContainer}>
        {calendarDays.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              !isCurrentMonth(date) && styles.outsideMonthDay,
              isToday(date) && styles.todayButton,
              isSelectedDate(date) && styles.selectedDayButton,
            ]}
            onPress={() => onSelectDate(date)}
          >
            <Text 
              style={[
                styles.dayText,
                !isCurrentMonth(date) && styles.outsideMonthDayText,
                isToday(date) && styles.todayText,
                isSelectedDate(date) && styles.selectedDayText,
              ]}
            >
              {date.getDate()}
            </Text>
            {hasEvents(date) && <View style={styles.eventIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textTransform: 'capitalize',
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
    width: 36,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  outsideMonthDay: {
    opacity: 0.4,
  },
  todayButton: {
    backgroundColor: '#E5E5EA',
  },
  selectedDayButton: {
    backgroundColor: '#0A84FF',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  outsideMonthDayText: {
    color: '#8E8E93',
  },
  todayText: {
    fontWeight: '700',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  eventIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF9F0A',
    position: 'absolute',
    bottom: 4,
  },
});