import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ToneOption } from '@/types/newsletter';

type ToneSelectorProps = {
  selectedToneId: number;
  toneOptions: ToneOption[];
  onSelectTone: (toneId: number) => void;
};

export default function ToneSelector({ selectedToneId, toneOptions, onSelectTone }: ToneSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.tonesContainer}>
        {toneOptions.map((tone) => (
          <TouchableOpacity
            key={tone.id}
            style={[
              styles.toneButton,
              selectedToneId === tone.id && styles.toneButtonSelected,
            ]}
            onPress={() => onSelectTone(tone.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.toneButtonText,
                selectedToneId === tone.id && styles.toneButtonTextSelected,
              ]}
            >
              {tone.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.helperText}>
        {selectedToneId === -1 ? 'Sélectionnez un ton' : 'Ton sélectionné'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  tonesContainer: {
    marginVertical: 8,
  },
  toneButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    marginBottom: 8,
    width: '100%',
  },
  toneButtonSelected: {
    backgroundColor: '#0A84FF',
  },
  toneButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  toneButtonTextSelected: {
    color: '#FFFFFF',
  },
  helperText: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
});