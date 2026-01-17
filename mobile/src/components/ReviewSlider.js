import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

const ReviewCategory = ({ label, score, maxScore = 5 }) => {
  const percentage = (score / maxScore) * 100;

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryLabel}>{label}</Text>
        <Text style={styles.categoryScore}>{score.toFixed(1)}</Text>
      </View>
      <View style={styles.sliderTrack}>
        <View style={[styles.sliderFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

const ReviewSlider = ({ reviews, overallRating, reviewCount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.overallContainer}>
        <View style={styles.overallRating}>
          <Text style={styles.ratingNumber}>{overallRating.toFixed(1)}</Text>
          <Text style={styles.starIcon}>⭐</Text>
        </View>
        <Text style={styles.reviewCount}>{reviewCount} reviews</Text>
      </View>

      <View style={styles.categoriesContainer}>
        <ReviewCategory label="Fair Portion" score={reviews.fairPortion} />
        <ReviewCategory label="Overall Hygiene" score={reviews.overallHygiene} />
        <ReviewCategory label="Freshness" score={reviews.freshness} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  overallContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  ratingNumber: {
    fontSize: FONT_SIZES.display,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginRight: SPACING.sm,
  },
  starIcon: {
    fontSize: 28,
  },
  reviewCount: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  categoriesContainer: {},
  categoryContainer: {
    marginBottom: SPACING.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  categoryScore: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primaryAccent,
    fontWeight: '600',
  },
  sliderTrack: {
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: COLORS.primaryAccent,
    borderRadius: BORDER_RADIUS.full,
  },
});

export default ReviewSlider;
