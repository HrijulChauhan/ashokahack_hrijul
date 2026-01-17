import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { formatPickupTime, calculateSavingsPercent } from '../data/mockData';
import Button from './Button';

const BagOptionCard = ({ bagOption, onReserve }) => {
  const pickupTime = formatPickupTime(bagOption.pickupStart, bagOption.pickupEnd);
  const savingsPercent = calculateSavingsPercent(bagOption.originalPrice, bagOption.price);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <Text style={styles.bagType}>{bagOption.type}</Text>
          <View style={styles.savingsBadge}>
            <Text style={styles.savingsText}>Save {savingsPercent}%</Text>
          </View>
        </View>
        <View style={styles.availabilityBadge}>
          <Text style={styles.availabilityText}>{bagOption.available} left</Text>
        </View>
      </View>

      <Text style={styles.description}>{bagOption.description}</Text>

      <View style={styles.detailsRow}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>₹{bagOption.originalPrice}</Text>
          <Text style={styles.price}>₹{bagOption.price}</Text>
        </View>
        
        <View style={styles.pickupContainer}>
          <Text style={styles.pickupLabel}>Pickup</Text>
          <Text style={styles.pickupTime}>{pickupTime}</Text>
        </View>
      </View>

      <Button
        title="Reserve"
        onPress={() => onReserve(bagOption)}
        variant="primary"
        size="medium"
        style={styles.reserveButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  typeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  bagType: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginRight: SPACING.sm,
  },
  savingsBadge: {
    backgroundColor: COLORS.primaryAccent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  savingsText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.background,
  },
  availabilityBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  availabilityText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: SPACING.md,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  originalPrice: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
    marginRight: SPACING.sm,
  },
  price: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.primaryAccent,
  },
  pickupContainer: {
    alignItems: 'flex-end',
  },
  pickupLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  pickupTime: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  reserveButton: {
    width: '100%',
  },
});

export default BagOptionCard;
