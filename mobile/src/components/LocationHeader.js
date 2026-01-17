import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

const LocationHeader = ({ location, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.locationWrapper}>
        <View style={styles.locationIcon}>
          <Text style={styles.pinIcon}>📍</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Current location</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </View>
          <Text style={styles.address} numberOfLines={1}>
            {location?.address || 'Set your location'}
          </Text>
        </View>
        <View style={styles.notificationIcon}>
          <Text style={styles.bellIcon}>🔔</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primaryAccent,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  pinIcon: {
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginRight: SPACING.xs,
  },
  dropdownIcon: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  address: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  notificationIcon: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 16,
  },
});

export default LocationHeader;
