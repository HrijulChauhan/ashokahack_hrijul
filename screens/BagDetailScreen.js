import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';

export default function BagDetailScreen({ route, navigation }) {
  const { bag } = route.params;

  const handleReserve = () => {
    const pickupCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    Alert.alert(
      'Reserved!',
      `Show this code at ${bag.restaurant}:\n\n${pickupCode}\n\nPickup: ${bag.pickupTime}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>{bag.restaurant}</Text>
          <Text style={styles.price}>₹{bag.price}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Pickup Window</Text>
          <Text style={styles.value}>{bag.pickupTime}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>{bag.distance}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>You Save</Text>
          <Text style={styles.saveValue}>₹{bag.originalPrice - bag.price}</Text>
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
        <Text style={styles.reserveButtonText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  reserveButton: {
    backgroundColor: '#6B4EFF',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
