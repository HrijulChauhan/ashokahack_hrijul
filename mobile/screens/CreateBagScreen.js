import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateBagScreen({ navigation }) {
  const [price, setPrice] = useState('');

  const handleGoLive = () => {
    if (!price || isNaN(price)) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }
    
    Alert.alert(
      'Success!',
      `Your Mystery Bag is now live for ₹${price}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Create Mystery Bag</Text>
      
      <Text style={styles.label}>Price (₹)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />
      
      <TouchableOpacity 
        style={styles.goLiveButton}
        onPress={handleGoLive}
      >
        <Text style={styles.goLiveButtonText}>Go Live</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    marginBottom: 30,
  },
  goLiveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  goLiveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
