import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TextInput, Alert } from 'react-native';
import ActionButton from '@/components/common/ActionButton';
import { getAppSettings, updateAppSettings } from '@/services/settingsService';
import { AppSettings } from '@/types/settings';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<AppSettings>({
    apiUrl: 'https://n8n.example.com/webhook/',
    apiKey: '',
    autoSync: true,
    notificationsEnabled: true,
    syncInterval: 15,
    language: 'fr',
    theme: 'light',
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await getAppSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
      Alert.alert('Erreur', 'Impossible de charger les paramètres');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateAppSettings(settings);
      Alert.alert('Succès', 'Les paramètres ont été mis à jour');
    } catch (error) {
      console.error('Failed to save settings:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder les paramètres');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Paramètres</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration N8N</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>URL de l'API N8N</Text>
          <TextInput
            style={styles.input}
            value={settings.apiUrl}
            onChangeText={(text) => setSettings({...settings, apiUrl: text})}
            placeholder="https://n8n.example.com/webhook/"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Clé API</Text>
          <TextInput
            style={styles.input}
            value={settings.apiKey}
            onChangeText={(text) => setSettings({...settings, apiKey: text})}
            placeholder="Votre clé API"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Synchronisation</Text>
        
        <View style={styles.switchRow}>
          <View style={styles.switchLabel}>
            <Text style={styles.switchText}>Synchronisation automatique</Text>
            <Text style={styles.switchDescription}>
              Synchroniser automatiquement les données avec N8N
            </Text>
          </View>
          <Switch
            value={settings.autoSync}
            onValueChange={(value) => setSettings({...settings, autoSync: value})}
            trackColor={{ false: '#D1D1D6', true: '#34C759' }}
            thumbColor={'#FFFFFF'}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Intervalle de synchronisation (minutes)</Text>
          <TextInput
            style={styles.input}
            value={settings.syncInterval.toString()}
            onChangeText={(text) => {
              const value = parseInt(text);
              if (!isNaN(value)) {
                setSettings({...settings, syncInterval: value});
              }
            }}
            keyboardType="numeric"
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.switchRow}>
          <View style={styles.switchLabel}>
            <Text style={styles.switchText}>Activer les notifications</Text>
            <Text style={styles.switchDescription}>
              Recevoir des notifications pour les événements importants
            </Text>
          </View>
          <Switch
            value={settings.notificationsEnabled}
            onValueChange={(value) => setSettings({...settings, notificationsEnabled: value})}
            trackColor={{ false: '#D1D1D6', true: '#34C759' }}
            thumbColor={'#FFFFFF'}
          />
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        <ActionButton
          title="Tester la connexion"
          type="secondary"
          onPress={() => Alert.alert('Test', 'Connexion réussie à N8N')}
          disabled={saving}
        />
        <ActionButton
          title="Enregistrer"
          onPress={handleSave}
          loading={saving}
          disabled={saving}
        />
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    marginBottom: 24,
    color: '#000000',
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#000000',
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000000',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    flex: 1,
  },
  switchText: {
    fontSize: 16,
    color: '#000000',
  },
  switchDescription: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 24,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});