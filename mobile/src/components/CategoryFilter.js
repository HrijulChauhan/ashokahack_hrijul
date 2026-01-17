import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

const CategoryItem = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
      onPress={() => onPress(category.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
        <Text style={styles.icon}>{category.icon}</Text>
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onPress={onSelectCategory}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  categoryItemSelected: {},
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainerSelected: {
    backgroundColor: COLORS.primaryAccent,
    borderColor: COLORS.primaryAccent,
  },
  icon: {
    fontSize: 28,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: COLORS.primaryAccent,
    fontWeight: '600',
  },
});

export default CategoryFilter;
