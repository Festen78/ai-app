import { View, Text, StyleSheet, Switch } from 'react-native';

type ImageToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function ImageToggle({ value, onChange }: ImageToggleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>
          {value ? 'Images incluses' : 'Images désactivées'}
        </Text>
        <Switch
          value={value}
          onValueChange={onChange}
          trackColor={{ false: '#D1D1D6', true: '#0A84FF' }}
          thumbColor={'#FFFFFF'}
        />
      </View>
      <Text style={styles.helperText}>
        {value 
          ? 'Les newsletters contiendront des images pour illustrer le contenu'
          : 'Les newsletters seront uniquement textuelles sans images'
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  helperText: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
});