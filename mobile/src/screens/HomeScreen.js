import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { LocationHeader, CategoryFilter, RestaurantCard, SearchBar } from '../components';
import BottomTabBar from '../components/BottomTabBar';
import FavouritesScreen from './FavouritesScreen';
import ProfileScreen from './ProfileScreen';
import {
  categories,
  userLocation,
  restaurants,
  getRelevantRestaurants,
  getPopularRestaurants,
  getNewlyAddedRestaurants,
} from '../data/mockData';

const SectionHeader = ({ title, onSeeAll }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    )}
  </View>
);

const RestaurantSection = ({ title, restaurants: restaurantList, onRestaurantPress, onSeeAll }) => (
  <View style={styles.section}>
    <SectionHeader title={title} onSeeAll={onSeeAll} />
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

const HomeContent = ({
  insets,
  searchQuery,
  setSearchQuery,
  handleFilterPress,
  selectedCategory,
  handleCategorySelect,
  relevantRestaurants,
  popularRestaurants,
  newlyAddedRestaurants,
  handleRestaurantPress,
  handleSeeAll,
  allFilteredRestaurants
}) => {
  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + SPACING.sm }
      ]}
    >
      <LocationHeader
        location={userLocation}
        onPress={() => console.log('Location pressed')}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={handleFilterPress}
      />

      {searchQuery.length > 0 ? (
        // Search Results View
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginLeft: SPACING.lg, marginBottom: SPACING.md }]}>
            Search Results
          </Text>
          {allFilteredRestaurants.length > 0 ? (
            <View style={{ paddingHorizontal: SPACING.lg }}>
              {allFilteredRestaurants.map((restaurant) => (
                <View key={restaurant.id} style={{ marginBottom: SPACING.md, alignItems: 'center' }}>
                  <RestaurantCard
                    restaurant={restaurant}
                    onPress={handleRestaurantPress}
                    variant="large"
                  />
                </View>
              ))}
            </View>
          ) : (
            <Text style={{ marginLeft: SPACING.lg, fontFamily: 'Saans', color: COLORS.textSecondary }}>
              No restaurants found matching "{searchQuery}"
            </Text>
          )}
        </View>
      ) : (
        // Standard Home View
        <>
          {relevantRestaurants.length > 0 && (
            <RestaurantSection
              title="Most Relevant"
              restaurants={relevantRestaurants}
              onRestaurantPress={handleRestaurantPress}
              onSeeAll={() => handleSeeAll('relevant')}
            />
          )}

          {popularRestaurants.length > 0 && (
            <RestaurantSection
              title="Most Popular Near You"
              restaurants={popularRestaurants}
              onRestaurantPress={handleRestaurantPress}
              onSeeAll={() => handleSeeAll('popular')}
            />
          )}

          {newlyAddedRestaurants.length > 0 && (
            <RestaurantSection
              title="New Added Rescue Bags"
              restaurants={newlyAddedRestaurants}
              onRestaurantPress={handleRestaurantPress}
              onSeeAll={() => handleSeeAll('new')}
            />
          )}
        </>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore');

  const insets = useSafeAreaInsets();

  // Filter based on category AND search query
  const allFilteredRestaurants = useMemo(() => {
    let result = restaurants;

    // 1. Filter by Category
    if (selectedCategory) {
      result = result.filter(r => r.categoryId === selectedCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(lowerQuery) ||
        r.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const relevantRestaurants = useMemo(() => {
    return getRelevantRestaurants(allFilteredRestaurants).slice(0, 6);
  }, [allFilteredRestaurants]);

  const popularRestaurants = useMemo(() => {
    return getPopularRestaurants(allFilteredRestaurants).slice(0, 6);
  }, [allFilteredRestaurants]);

  const newlyAddedRestaurants = useMemo(() => {
    return getNewlyAddedRestaurants(allFilteredRestaurants).slice(0, 6);
  }, [allFilteredRestaurants]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return (
          <HomeContent
            insets={insets}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleFilterPress={() => console.log('Filter')}
            selectedCategory={selectedCategory}
            handleCategorySelect={handleCategorySelect}
            relevantRestaurants={relevantRestaurants}
            popularRestaurants={popularRestaurants}
            newlyAddedRestaurants={newlyAddedRestaurants}
            handleRestaurantPress={handleRestaurantPress}
            handleSeeAll={() => { }}
            allFilteredRestaurants={allFilteredRestaurants}
          />
        );
      case 'favourites':
        return (
          <FavouritesScreen onRestaurantPress={handleRestaurantPress} />
        );
      case 'profile':
        return (
          <ProfileScreen />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {renderContent()}

      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
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
    paddingTop: SPACING.xxl,
  },
  section: {
    marginTop: SPACING.xl,
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
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Gargoyle',
  },
  seeAllText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: '500',
    fontFamily: 'Saans',
  },
  horizontalScrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  bottomPadding: {
    height: 100,
  },
});

export default HomeScreen;
