import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockBags } from '../data/mockData';

export default function StudentHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>PICKUP NOW</Text>
        
        {mockBags.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('BagDetail', { bag: item })}
          >
            <View style={styles.cardContent}>
              <Text style={styles.restaurantName}>{item.restaurant}</Text>
              <Text style={styles.priceNew}>₹{item.price}</Text>
              <Text style={styles.infoText}>{item.distance} • {item.pickupTime}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  cardContent: {
    flexDirection: 'column',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceNew: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
});
