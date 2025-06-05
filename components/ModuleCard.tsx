import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, Mail, Calendar, Scan } from 'lucide-react-native';

type ModuleCardProps = {
  title: string;
  icon: string;
  route: string;
  color: string;
  description: string;
};

export default function ModuleCard({ title, icon, route, color, description }: ModuleCardProps) {
  const router = useRouter();

  const renderIcon = () => {
    const iconProps = { size: 24, color: color };
    
    switch (icon) {
      case 'bell':
        return <Bell {...iconProps} />;
      case 'mail':
        return <Mail {...iconProps} />;
      case 'calendar':
        return <Calendar {...iconProps} />;
      case 'scan':
        return <Scan {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(route)}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        {renderIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  description: {
    fontSize: 12,
    color: '#8E8E93',
    lineHeight: 16,
  },
});