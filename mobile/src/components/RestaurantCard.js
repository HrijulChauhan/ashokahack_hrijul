import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { formatPickupTime } from '../data/mockData';

const RestaurantCard = ({ restaurant, onPress, variant = 'default' }) => {
  const firstBag = restaurant.bagOptions?.[0];
  const pickupTimeDisplay = firstBag 
    ? formatPickupTime(firstBag.pickupStart, firstBag.pickupEnd)
    : 'Check availability';

  const lowestPrice = restaurant.bagOptions 
    ? Math.min(...restaurant.bagOptions.map(b => b.price))
    : 0;

  return (
    <TouchableOpacity
      style={[styles.container, variant === 'large' && styles.containerLarge]}
      onPress={() => onPress(restaurant)}
      activeOpacity={0.8}
    >
      <View style={[styles.imageContainer, variant === 'large' && styles.imageContainerLarge]}>
        <Image
          source={{ uri: restaurant.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {restaurant.vegOnly && (
          <View style={styles.vegBadge}>
            <Text style={styles.vegText}>🌱</Text>
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.restaurantName} numberOfLines={1}>
          {restaurant.name}
        </Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.distance}>{restaurant.distance} km</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
          {restaurant.reviewCount && (
            <>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.reviews}>{restaurant.reviewCount} reviews</Text>
            </>
          )}
        </View>
        
        <View style={styles.bottomRow}>
          <Text style={styles.pickupTime}>Pickup: {pickupTimeDisplay}</Text>
        </View>

        {variant === 'large' && (
          <View style={styles.priceRow}>
            <Text style={styles.fromText}>From</Text>
            <Text style={styles.price}>₹{lowestPrice}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginRight: SPACING.md,
    ...SHADOWS.md,
  },
  containerLarge: {
    width: 280,
  },
  imageContainer: {
    height: 120,
    position: 'relative',
  },
  imageContainerLarge: {
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  vegBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.full,
    padding: 4,
  },
  vegText: {
    fontSize: 14,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  restaurantName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    flexWrap: 'wrap',
  },
  distance: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  separator: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    marginHorizontal: SPACING.xs,
  },
  rating: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  reviews: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
  },
  bottomRow: {
    marginTop: SPACING.xs,
  },
  pickupTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primaryAccent,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: SPACING.sm,
  },
  fromText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    marginRight: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.primaryAccent,
  },
});

export default RestaurantCard;
