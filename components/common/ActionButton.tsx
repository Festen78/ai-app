import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

type ActionButtonProps = {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
};

export default function ActionButton({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
}: ActionButtonProps) {
  const buttonStyle = [
    styles.button,
    type === 'primary' && styles.primaryButton,
    type === 'secondary' && styles.secondaryButton,
    type === 'danger' && styles.dangerButton,
    disabled && styles.disabledButton,
    fullWidth && styles.fullWidthButton,
  ];

  const textStyle = [
    styles.buttonText,
    type === 'primary' && styles.primaryButtonText,
    type === 'secondary' && styles.secondaryButtonText,
    type === 'danger' && styles.dangerButtonText,
    disabled && styles.disabledButtonText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={type === 'primary' ? '#FFFFFF' : '#0A84FF'}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: '#0A84FF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0A84FF',
  },
  dangerButton: {
    backgroundColor: '#FF453A',
  },
  disabledButton: {
    backgroundColor: '#E5E5EA',
    borderColor: '#E5E5EA',
  },
  fullWidthButton: {
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#0A84FF',
  },
  dangerButtonText: {
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: '#8E8E93',
  },
});