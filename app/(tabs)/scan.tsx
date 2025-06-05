import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { CameraView } from 'expo-camera';
import { Camera, Upload } from 'lucide-react-native';
import ActionButton from '@/components/common/ActionButton';
import ScanHistory from '@/components/scan/ScanHistory';
import { useCameraPermissions } from 'expo-camera';
import { Platform } from 'react-native';

export default function ScanScreen() {
  const [cameraActive, setCameraActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any | null>(null);

  // Demo scanned items
  const scannedItems = [
    {
      id: '1',
      date: new Date(),
      type: 'Facture',
      merchant: 'Supermarché XYZ',
      amount: '42.15 €',
      status: 'processed',
    },
    {
      id: '2',
      date: new Date(Date.now() - 86400000), // 1 day ago
      type: 'Reçu',
      merchant: 'Restaurant ABC',
      amount: '28.50 €',
      status: 'processed',
    },
    {
      id: '3',
      date: new Date(Date.now() - 172800000), // 2 days ago
      type: 'Ticket',
      merchant: 'Parking Centre-Ville',
      amount: '4.00 €',
      status: 'error',
    },
  ];

  const startCamera = async () => {
    if (!permission?.granted) {
      const perm = await requestPermission();
      if (!perm.granted) {
        return;
      }
    }
    setCameraActive(true);
  };

  // Mock scan from camera
  const takePicture = async () => {
    setCameraActive(false);
    setScannedImage('https://images.pexels.com/photos/3643925/pexels-photo-3643925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    // Simulate processing delay
    setTimeout(() => {
      setScanResult({
        type: 'Facture',
        merchant: 'Café du Centre',
        date: new Date(),
        amount: '18.50 €',
        items: [
          { name: 'Café', price: '3.50 €' },
          { name: 'Croissant', price: '2.00 €' },
          { name: 'Sandwich', price: '8.00 €' },
          { name: 'Dessert', price: '5.00 €' },
        ]
      });
    }, 2000);
  };

  // Mock scan from gallery
  const uploadFromGallery = () => {
    setScannedImage('https://images.pexels.com/photos/3643925/pexels-photo-3643925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    // Simulate processing delay
    setTimeout(() => {
      setScanResult({
        type: 'Facture',
        merchant: 'Café du Centre',
        date: new Date(),
        amount: '18.50 €',
        items: [
          { name: 'Café', price: '3.50 €' },
          { name: 'Croissant', price: '2.00 €' },
          { name: 'Sandwich', price: '8.00 €' },
          { name: 'Dessert', price: '5.00 €' },
        ]
      });
    }, 2000);
  };

  const resetScan = () => {
    setScannedImage(null);
    setScanResult(null);
  };

  // Camera view
  if (cameraActive && Platform.OS !== 'web') {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing="back">
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.captureButton} 
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setCameraActive(false)}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Scanner de Factures</Text>
      
      {!scannedImage ? (
        <View style={styles.scanOptions}>
          <TouchableOpacity style={styles.scanOption} onPress={startCamera}>
            <View style={styles.iconContainer}>
              <Camera size={32} color="#0A84FF" />
            </View>
            <Text style={styles.scanOptionText}>Prendre une photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.scanOption} onPress={uploadFromGallery}>
            <View style={styles.iconContainer}>
              <Upload size={32} color="#5E5CE6" />
            </View>
            <Text style={styles.scanOptionText}>Importer une image</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Image 
            source={{ uri: scannedImage }}
            style={styles.scannedImage}
            resizeMode="cover"
          />
          
          {scanResult ? (
            <View style={styles.scanResultCard}>
              <Text style={styles.resultTitle}>{scanResult.merchant}</Text>
              <Text style={styles.resultDate}>
                {new Date(scanResult.date).toLocaleDateString('fr-FR')}
              </Text>
              <Text style={styles.resultAmount}>{scanResult.amount}</Text>
              
              <View style={styles.resultItems}>
                {scanResult.items.map((item: any, index: number) => (
                  <View key={index} style={styles.resultItem}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.actionsRow}>
                <ActionButton 
                  title="Enregistrer" 
                  type="primary"
                  onPress={resetScan}
                />
                <ActionButton 
                  title="Annuler" 
                  type="secondary"
                  onPress={resetScan}
                />
              </View>
            </View>
          ) : (
            <View style={styles.processingContainer}>
              <Text style={styles.processingText}>Traitement en cours...</Text>
            </View>
          )}
        </View>
      )}
      
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Historique des scans</Text>
        <ScanHistory items={scannedItems} />
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
  scanOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  scanOption: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  scanOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  historySection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  cancelButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginBottom: 24,
  },
  scannedImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  processingContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  processingText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  scanResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  resultDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  resultAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  resultItems: {
    marginBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});