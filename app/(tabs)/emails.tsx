import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import EmailTemplateCard from '@/components/emails/EmailTemplateCard';
import { EmailTemplate } from '@/types/email';

const demoTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Confirmation de commande',
    subject: 'Votre commande a été confirmée',
    lastModified: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Bienvenue',
    subject: 'Bienvenue sur notre plateforme',
    lastModified: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: '3',
    name: 'Réinitialisation de mot de passe',
    subject: 'Réinitialisez votre mot de passe',
    lastModified: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  }
];

export default function EmailsScreen() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(demoTemplates);
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Gestion des Emails</Text>
      <Text style={styles.description}>
        Consultez et modifiez vos templates d'emails. Ces templates sont utilisés pour
        envoyer des emails via vos workflows N8N.
      </Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0A84FF" />
          <Text style={styles.loadingText}>Chargement des templates...</Text>
        </View>
      ) : (
        <View style={styles.templatesContainer}>
          {templates.map((template) => (
            <EmailTemplateCard key={template.id} template={template} />
          ))}
        </View>
      )}
      
      <View style={styles.noticeContainer}>
        <Text style={styles.noticeText}>
          Ce module est en cours de développement. Plus de fonctionnalités seront disponibles prochainement.
        </Text>
      </View>
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
    marginBottom: 24,
    lineHeight: 22,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  templatesContainer: {
    marginBottom: 24,
  },
  noticeContainer: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginTop: 16,
  },
  noticeText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});