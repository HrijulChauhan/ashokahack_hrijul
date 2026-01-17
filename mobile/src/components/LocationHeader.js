import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

const LocationHeader = ({ location, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerIconBox} onPress={onPress}>
        <Text style={styles.icon}>📍</Text>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <TouchableOpacity style={styles.labelRow} onPress={onPress}>
          <Text style={styles.label}>Current location</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
        <Text style={styles.address}>
          {location?.address || 'Set your location'}
        </Text>
      </View>

      <TouchableOpacity style={styles.headerIconBox}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🔔</Text>
          <View style={styles.notificationDot} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: 'transparent',
  },
  headerIconBox: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.headerBox,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconWrapper: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: COLORS.error,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.headerBox,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontFamily: 'Saans-Medium',
  },
  dropdownIcon: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  address: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.locationText,
    fontFamily: 'Saans-Bold',
    marginTop: 2,
  },
});

export default LocationHeader;
