import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { formatPickupTime } from '../data/mockData';
import { useFavorites } from '../context/FavoritesContext';

const RestaurantCard = ({ restaurant, onPress, variant = 'default' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(restaurant.id);

  const firstBag = restaurant.bagOptions?.[0];
  const pickupTimeDisplay = firstBag
    ? formatPickupTime(firstBag.pickupStart, firstBag.pickupEnd)
    : 'Check availability';

  const lowestPrice = restaurant.bagOptions
    ? Math.min(...restaurant.bagOptions.map(b => b.price))
    : 0;

  const originalPrice = restaurant.bagOptions
    ? Math.min(...restaurant.bagOptions.map(b => b.originalPrice))
    : 0;

  const handleFavoritePress = (e) => {
    e.stopPropagation();
    toggleFavorite(restaurant.id);
  };

  return (
    <TouchableOpacity
      style={[styles.container, variant === 'large' && styles.containerLarge]}
      onPress={() => onPress(restaurant)}
      activeOpacity={0.8}
    >
      {/* Image with overlays */}
      <View style={[styles.imageContainer, variant === 'large' && styles.imageContainerLarge]}>
        <Image
          source={{ uri: restaurant.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Price Badge - Top Left */}
        <View style={styles.priceBadge}>
          <Text style={styles.originalPrice}>₹{originalPrice}</Text>
          <Text style={styles.discountedPrice}>₹{lowestPrice}</Text>
        </View>

        {/* Favorite Heart - Top Right */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          activeOpacity={0.7}
        >
          <Text style={styles.heartIcon}>{favorite ? '💗' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.restaurantName} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
            <Text style={styles.starIcon}>★</Text>
          </View>
        </View>

        <Text style={styles.infoText} numberOfLines={1}>
          {restaurant.distance} kms  |  Pickup: {pickupTimeDisplay.toLowerCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginRight: SPACING.md,
    ...SHADOWS.md,
  },
  containerLarge: {
    width: '100%',
    marginRight: 0,
  },
  imageContainer: {
    height: 100,
    position: 'relative',
    backgroundColor: COLORS.border,
  },
  imageContainerLarge: {
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryAccent,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  originalPrice: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.background,
    textDecorationLine: 'line-through',
    marginRight: SPACING.xs,
    opacity: 0.8,
  },
  discountedPrice: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.background,
    fontFamily: 'Saans-Bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    fontSize: 18,
  },
  contentContainer: {
    padding: SPACING.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  restaurantName: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginRight: SPACING.xs,
    fontFamily: 'Gargoyle',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.starActive,
    fontFamily: 'Saans-Medium',
    marginRight: 2,
  },
  starIcon: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.starActive,
  },
  infoText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary, // Changed to grey
    fontFamily: 'Saans',
    opacity: 0.7, // Reduced opacity
  },
});

export default RestaurantCard;
