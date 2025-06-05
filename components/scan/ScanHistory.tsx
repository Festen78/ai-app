import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';

type ScanItem = {
  id: string;
  date: Date;
  type: string;
  merchant: string;
  amount: string;
  status: 'processed' | 'error' | 'pending';
};

type ScanHistoryProps = {
  items: ScanItem[];
};

export default function ScanHistory({ items }: ScanHistoryProps) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun scan dans l'historique</Text>
      </View>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle size={20} color="#30D158" />;
      case 'error':
        return <XCircle size={20} color="#FF453A" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.scanItem}
          onPress={() => router.push(`/scan/details/${item.id}`)}
          activeOpacity={0.8}
        >
          <View style={styles.scanItemHeader}>
            <Text style={styles.scanType}>{item.type}</Text>
            {getStatusIcon(item.status)}
          </View>
          
          <Text style={styles.merchantName}>{item.merchant}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
          
          <Text style={styles.scanDate}>
            {item.date.toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
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
  scanItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scanItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scanType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  merchantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  scanDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
});