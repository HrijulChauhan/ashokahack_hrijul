import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

const Badge = ({
  text,
  variant = 'default', // 'default', 'secondary', 'outline', 'success'
  size = 'medium', // 'small', 'medium'
  icon,
  style,
  textStyle,
}) => {
  const getBadgeStyle = () => {
    const baseStyle = [styles.badge, styles[`${size}Badge`]];
    
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.secondaryBadge);
        break;
      case 'outline':
        baseStyle.push(styles.outlineBadge);
        break;
      case 'success':
        baseStyle.push(styles.successBadge);
        break;
      default:
        baseStyle.push(styles.defaultBadge);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.badgeText, styles[`${size}Text`]];
    
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.secondaryText);
        break;
      case 'outline':
        baseStyle.push(styles.outlineText);
        break;
      case 'success':
        baseStyle.push(styles.successText);
        break;
      default:
        baseStyle.push(styles.defaultText);
    }
    
    return baseStyle;
  };

  return (
    <View style={[...getBadgeStyle(), style]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[...getTextStyle(), textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.full,
  },
  
  // Size variants
  smallBadge: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  mediumBadge: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  
  // Variant styles
  defaultBadge: {
    backgroundColor: COLORS.primaryAccent,
  },
  secondaryBadge: {
    backgroundColor: COLORS.cardBackground,
  },
  outlineBadge: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  successBadge: {
    backgroundColor: COLORS.success,
  },
  
  // Text styles
  badgeText: {
    fontWeight: '500',
  },
  smallText: {
    fontSize: FONT_SIZES.xs,
  },
  mediumText: {
    fontSize: FONT_SIZES.sm,
  },
  defaultText: {
    color: COLORS.background,
  },
  secondaryText: {
    color: COLORS.textPrimary,
  },
  outlineText: {
    color: COLORS.textSecondary,
  },
  successText: {
    color: COLORS.background,
  },
  
  icon: {
    marginRight: SPACING.xs,
    fontSize: FONT_SIZES.sm,
  },
});

export default Badge;
