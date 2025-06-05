import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

type MarkdownPreviewProps = {
  content: string;
  label: string;
  description?: string;
};

export default function MarkdownPreview({ content, label, description }: MarkdownPreviewProps) {
  // Split content into parts before any image markdown
  const parts = content.split(/!\[.*?\]\((.*?)\)/);
  
  // Extract image URLs from markdown
  const images = content.match(/!\[.*?\]\((.*?)\)/g)?.map(img => {
    const match = img.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
  }) || [];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      
      <ScrollView style={styles.contentContainer}>
        {parts.map((part, index) => (
          <View key={index}>
            {/* Only render text content if it's not a base64 string */}
            {part.trim() && !part.includes('data:image/') && (
              <Text style={styles.text}>{part.trim()}</Text>
            )}
            {/* Render image if available */}
            {images[index] && (
              <Image
                source={{ uri: images[index] || '' }}
                style={styles.image}
                resizeMode="contain"
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#000000',
  },
  description: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  contentContainer: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    maxHeight: 300,
  },
  text: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
});