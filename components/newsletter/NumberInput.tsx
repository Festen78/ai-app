import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export default function NumberInput({
  value,
  onChange,
  min = 1,
  max = 100,
  step = 1,
}: NumberInputProps) {
  const increment = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const decrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  const handleTextChange = (text: string) => {
    const numValue = parseInt(text);
    if (!isNaN(numValue)) {
      if (numValue >= min && numValue <= max) {
        onChange(numValue);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[styles.button, value <= min && styles.buttonDisabled]}
          onPress={decrement}
          disabled={value <= min}
        >
          <Minus size={20} color={value <= min ? '#8E8E93' : '#0A84FF'} />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          value={value.toString()}
          onChangeText={handleTextChange}
          keyboardType="numeric"
          textAlign="center"
        />
        
        <TouchableOpacity
          style={[styles.button, value >= max && styles.buttonDisabled]}
          onPress={increment}
          disabled={value >= max}
        >
          <Plus size={20} color={value >= max ? '#8E8E93' : '#0A84FF'} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.helperText}>
        Min: {min}, Max: {max}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  helperText: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    textAlign: 'center',
  },
});