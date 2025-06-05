import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import VariableInput from '@/components/newsletter/VariableInput';
import ToneSelector from '@/components/newsletter/ToneSelector';
import ImageToggle from '@/components/newsletter/ImageToggle';
import NumberInput from '@/components/newsletter/NumberInput';
import ActionButton from '@/components/common/ActionButton';
import MarkdownPreview from '@/components/newsletter/MarkdownPreview';
import { fetchNewsletterVariables, updateNewsletterVariables, testKeywords, sendComment } from '@/services/webhookService';
import { NewsletterVariables, ToneOption } from '@/types/newsletter';

export default function NewsletterScreen() {
  const [variables, setVariables] = useState<NewsletterVariables>({
    selectedToneId: -1,
    maxLines: 10,
    includeImage: true,
    keywords: '',
    verification: '',
  });
  
  const [toneOptions, setToneOptions] = useState<ToneOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [sending, setSending] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    loadVariables();
  }, [retryCount]);

  const loadVariables = async () => {
    setLoading(true);
    setError(null);
    try {
      const { variables: newVariables, toneOptions: newToneOptions } = await fetchNewsletterVariables();
      setVariables(newVariables);
      setToneOptions(newToneOptions);
    } catch (err) {
      setError('Impossible de se connecter au webhook. Veuillez vérifier votre connexion et réessayer.');
      console.error('Failed to load newsletter variables:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateNewsletterVariables(variables);
      setError('Les variables ont été mises à jour avec succès.');
    } catch (err) {
      setError('Erreur lors de la sauvegarde. Impossible de se connecter au webhook.');
      console.error('Failed to save settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    if (!variables.keywords.trim()) {
      setError('Veuillez entrer des mots clés avant de tester.');
      return;
    }

    setTesting(true);
    setError(null);
    try {
      const verification = await testKeywords(variables.keywords);
      setVariables(prev => ({ ...prev, verification }));
      setError('Test effectué avec succès.');
    } catch (err) {
      setError('Erreur lors du test. Impossible de se connecter au webhook.');
      console.error('Failed to test keywords:', err);
    } finally {
      setTesting(false);
    }
  };

  const handleSendComment = async () => {
    if (!comment.trim()) {
      setError('Veuillez entrer un commentaire avant d\'envoyer.');
      return;
    }

    setSending(true);
    setError(null);
    try {
      const newVerification = await sendComment(comment, variables.verification, variables);
      setVariables(prev => ({ ...prev, verification: newVerification }));
      setError('Commentaire envoyé avec succès.');
      setComment('');
    } catch (err) {
      setError('Erreur lors de l\'envoi du commentaire.');
      console.error('Failed to send comment:', err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0A84FF" />
        <Text style={styles.loadingText}>Chargement des variables...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Configuration Newsletter</Text>
      
      {error && (
        <View style={[
          styles.errorContainer,
          error.includes('succès') && styles.successContainer
        ]}>
          <Text style={[
            styles.errorText,
            error.includes('succès') && styles.successText
          ]}>{error}</Text>
          {!error.includes('succès') && (
            <ActionButton
              title="Réessayer"
              type="secondary"
              onPress={() => setRetryCount(c => c + 1)}
              style={styles.retryButton}
            />
          )}
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Configuration générale</Text>
        
        <Text style={styles.subsectionTitle}>Ton de la Newsletter</Text>
        <ToneSelector 
          selectedToneId={variables.selectedToneId}
          toneOptions={toneOptions}
          onSelectTone={(toneId) => setVariables({...variables, selectedToneId: toneId})}
        />

        <Text style={styles.subsectionTitle}>Nombre maximum de lignes</Text>
        <Text style={styles.description}>
          Définissez le nombre maximum de lignes à inclure dans vos newsletters.
        </Text>
        <NumberInput 
          value={variables.maxLines}
          onChange={(value) => setVariables({...variables, maxLines: value})}
          min={1}
          max={50}
        />

        <Text style={styles.subsectionTitle}>Inclure des images</Text>
        <Text style={styles.description}>
          Choisissez si vous souhaitez inclure des images dans vos newsletters.
        </Text>
        <ImageToggle 
          value={variables.includeImage}
          onChange={(value) => setVariables({...variables, includeImage: value})}
        />

        <View style={styles.actionsContainer}>
          <ActionButton 
            title="Actualiser" 
            onPress={() => setRetryCount(c => c + 1)} 
            type="secondary"
            disabled={loading || saving}
          />
          <ActionButton 
            title="Enregistrer" 
            onPress={handleSave} 
            loading={saving}
            disabled={loading || saving}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Création</Text>
        
        <VariableInput
          label="Mots clés"
          value={variables.keywords}
          onChange={(value) => setVariables({...variables, keywords: value})}
          placeholder="Entrez vos mots clés séparés par des virgules"
          description="Les mots clés qui seront utilisés pour générer le contenu"
          multiline
        />

        <View style={styles.testContainer}>
          <ActionButton
            title="Tester"
            type="secondary"
            onPress={handleTest}
            loading={testing}
            disabled={testing || !variables.keywords.trim()}
          />
        </View>

        <View style={styles.verificationContainer}>
          {(testing || sending) ? (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#0A84FF" />
              <Text style={styles.loadingText}>
                {testing ? 'Génération en cours...' : 'Envoi du commentaire...'}
              </Text>
            </View>
          ) : (
            <MarkdownPreview
              label="Vérification"
              content={variables.verification}
              description="Contenu retourné par le webhook pour vérification"
            />
          )}
        </View>

        <View style={styles.commentSection}>
          <VariableInput
            label="Commentaire"
            value={comment}
            onChange={setComment}
            placeholder="Entrez votre commentaire"
            description="Ajoutez un commentaire sur le contenu généré"
            multiline
          />
          <View style={styles.commentButton}>
            <ActionButton
              title="Envoyer le commentaire"
              onPress={handleSendComment}
              loading={sending}
              disabled={sending || !comment.trim()}
            />
          </View>
        </View>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    color: '#000000',
  },
  card: {
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
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#000000',
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
    lineHeight: 20,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF453A',
  },
  successContainer: {
    backgroundColor: '#E8F5E9',
    borderLeftColor: '#4CAF50',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginBottom: 8,
  },
  successText: {
    color: '#2E7D32',
  },
  retryButton: {
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  testContainer: {
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  verificationContainer: {
    position: 'relative',
  },
  loadingOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
  },
  commentSection: {
    marginTop: 16,
  },
  commentButton: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
});