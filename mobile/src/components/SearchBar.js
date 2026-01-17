import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search menu, restaurant or etc",
  onFilterPress
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
      />
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Ionicons name="options-outline" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle transparent background
    borderRadius: BORDER_RADIUS.full,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#33443C', // Dark border
  },
  searchIcon: {
    marginRight: SPACING.sm,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontFamily: 'Saans', // Using Saans for body/input
    paddingVertical: SPACING.sm,
  },
  filterButton: {
    marginLeft: SPACING.sm,
    opacity: 0.8,
  },
});

export default SearchBar;
