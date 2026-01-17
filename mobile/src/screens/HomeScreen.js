import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { LocationHeader, CategoryFilter, RestaurantCard } from '../components';
import {
  categories,
  userLocation,
  restaurants,
  getRelevantRestaurants,
  getPopularRestaurants,
  getNewlyAddedRestaurants,
  getRestaurantsByCategory,
} from '../data/mockData';

const SectionTitle = ({ title, onSeeAll }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {onSeeAll && (
      <Text style={styles.seeAllText} onPress={onSeeAll}>
        See all
      </Text>
    )}
  </View>
);

const RestaurantSection = ({ title, restaurants: restaurantList, onRestaurantPress }) => (
  <View style={styles.section}>
    <SectionTitle title={title} />
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalScrollContent}
    >
      {restaurantList.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onPress={onRestaurantPress}
        />
      ))}
    </ScrollView>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredRestaurants = useMemo(() => {
    return getRestaurantsByCategory(restaurants, selectedCategory);
  }, [selectedCategory]);

  const relevantRestaurants = useMemo(() => {
    return getRelevantRestaurants(filteredRestaurants).slice(0, 6);
  }, [filteredRestaurants]);

  const popularRestaurants = useMemo(() => {
    return getPopularRestaurants(filteredRestaurants).slice(0, 6);
  }, [filteredRestaurants]);

  const newlyAddedRestaurants = useMemo(() => {
    return getNewlyAddedRestaurants(filteredRestaurants).slice(0, 6);
  }, [filteredRestaurants]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const handleLocationPress = () => {
    console.log('Location pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LocationHeader
          location={userLocation}
          onPress={handleLocationPress}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {relevantRestaurants.length > 0 && (
          <RestaurantSection
            title="Most Relevant to You"
            restaurants={relevantRestaurants}
            onRestaurantPress={handleRestaurantPress}
          />
        )}

        {popularRestaurants.length > 0 && (
          <RestaurantSection
            title="Most Popular"
            restaurants={popularRestaurants}
            onRestaurantPress={handleRestaurantPress}
          />
        )}

        {newlyAddedRestaurants.length > 0 && (
          <RestaurantSection
            title="Newly Added"
            restaurants={newlyAddedRestaurants}
            onRestaurantPress={handleRestaurantPress}
          />
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
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
    paddingTop: SPACING.xxxl,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primaryAccent,
    fontWeight: '500',
  },
  horizontalScrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  bottomPadding: {
    height: SPACING.xxxl,
  },
});

export default HomeScreen;
