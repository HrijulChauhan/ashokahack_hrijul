import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { Badge, BagOptionCard, ReviewSlider } from '../components';

const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;

  const handleReserve = (bagOption) => {
    navigation.navigate('Reservation', { restaurant, bagOption });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.coverBubble}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{restaurant.timeToReach} min</Text>
            <Text style={styles.infoDivider}>|</Text>
            <Text style={styles.infoText}>{restaurant.location}</Text>
            <Text style={styles.infoDivider}>|</Text>
            <Text style={styles.infoText}>⭐ {restaurant.rating}</Text>
          </View>
        </View>

        <View style={styles.badgesContainer}>
          {restaurant.vegOnly && (
            <Badge
              text="Veg Only"
              icon="🌱"
              variant="outline"
              size="medium"
              style={styles.badge}
            />
          )}
          <Badge
            text={restaurant.category.charAt(0).toUpperCase() + restaurant.category.slice(1)}
            variant="secondary"
            size="medium"
            style={styles.badge}
          />
          <Badge
            text={`${restaurant.reviewCount} reviews`}
            variant="outline"
            size="medium"
            style={styles.badge}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Rescue Bags</Text>
          {restaurant.bagOptions.map((bagOption) => (
            <BagOptionCard
              key={bagOption.id}
              bagOption={bagOption}
              onReserve={handleReserve}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What You Could Get</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ingredientsScroll}
          >
            {restaurant.possibleIngredients.map((ingredient, index) => (
              <Badge
                key={index}
                text={ingredient}
                variant="outline"
                size="medium"
                style={styles.ingredientBadge}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <ReviewSlider
            reviews={restaurant.reviews}
            overallRating={restaurant.rating}
            reviewCount={restaurant.reviewCount}
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.md,
  },
  backButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  backText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primaryAccent,
    fontWeight: '500',
  },
  coverBubble: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.xxl,
    padding: SPACING.xl,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  restaurantName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  infoDivider: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textMuted,
    marginHorizontal: SPACING.sm,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  badge: {
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  section: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  ingredientsScroll: {},
  ingredientBadge: {
    marginRight: SPACING.sm,
  },
  bottomPadding: {
    height: SPACING.xxxl,
  },
});

export default RestaurantDetailScreen;
