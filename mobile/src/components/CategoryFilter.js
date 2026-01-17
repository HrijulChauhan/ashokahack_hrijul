import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

// Placeholder images - replace with actual images later
const categoryImages = {
  breakfast: null, // Will be: require('../../assets/images/categories/breakfast.png')
  dinner: null,    // Will be: require('../../assets/images/categories/dinner.png')
  grocery: null,   // Will be: require('../../assets/images/categories/grocery.png')
  dessert: null,   // Will be: require('../../assets/images/categories/dessert.png')
};

// Placeholder illustrations using emoji for now
const categoryEmojis = {
  breakfast: '🥐',
  dinner: '🥡',
  grocery: '🥬',
  dessert: '🍰',
  desserts: '🍰', // alias for backwards compatibility
};

const CategoryCard = ({ category, isSelected, onPress }) => {
  const emoji = categoryEmojis[category.id] || '🍽️';

  return (
    <TouchableOpacity
      style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
      onPress={() => onPress(category.id)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Text style={[styles.placeholderEmoji, isSelected && styles.placeholderEmojiSelected]}>
          {emoji}
        </Text>
      </View>
      <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardsWrapper}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onPress={onSelectCategory}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  cardsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryCard: {
    width: '23%', // Roughly 4 cards per row
    aspectRatio: 0.85,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.inactiveCategory,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xs,
  },
  categoryCardSelected: {
    backgroundColor: COLORS.activeCategory,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: {
    fontSize: 40,
    opacity: 0.8,
  },
  placeholderEmojiSelected: {
    opacity: 1,
  },
  categoryText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.inactiveCategoryText,
    fontFamily: 'Gargoyle',
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  categoryTextSelected: {
    color: COLORS.activeCategoryText,
  },
});

export default CategoryFilter;
