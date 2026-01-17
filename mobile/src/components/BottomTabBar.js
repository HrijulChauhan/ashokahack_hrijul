import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';

const tabs = [
  { id: 'explore', label: 'Explore', icon: 'bag-handle-outline', activeIcon: 'bag-handle' },
  { id: 'favourites', label: 'Favourites', icon: 'heart-outline', activeIcon: 'heart' },
  { id: 'profile', label: 'Profile', icon: 'person-circle-outline', activeIcon: 'person-circle' },
];

const BottomTabBar = ({ activeTab = 'explore', onTabPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabPress?.(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={24}
                color={isActive ? COLORS.tabBarActive : COLORS.tabBarInactive}
              />
              <Text style={[
                styles.tabLabel,
                isActive && styles.tabLabelActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: SPACING.lg,
    right: SPACING.lg,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.tabBarBackground,
    borderRadius: BORDER_RADIUS.full,
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.tabBarBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  tab: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  tabLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.tabBarInactive,
    fontFamily: 'Saans', // Using the new font for labels
    marginTop: 7,
  },
  tabLabelActive: {
    color: COLORS.tabBarActive,
    fontWeight: '600',
  },
});

export default BottomTabBar;
