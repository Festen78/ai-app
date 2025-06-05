import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, CreditCard as Edit } from 'lucide-react-native';
import { EmailTemplate } from '@/types/email';

type EmailTemplateCardProps = {
  template: EmailTemplate;
};

export default function EmailTemplateCard({ template }: EmailTemplateCardProps) {
  const router = useRouter();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Mail size={24} color="#5E5CE6" />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.templateName}>{template.name}</Text>
        <Text style={styles.templateSubject}>{template.subject}</Text>
        <Text style={styles.templateDate}>
          Modifié le {formatDate(template.lastModified)}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => router.push(`/emails/edit/${template.id}`)}
      >
        <Edit size={20} color="#0A84FF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0EFFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  templateSubject: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 4,
  },
  templateDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});