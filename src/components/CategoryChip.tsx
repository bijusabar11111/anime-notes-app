import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import type { StyleProp } from 'react-native';

interface CategoryChipProps {
  label: string;
  emoji?: string;
  active: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function CategoryChip({ label, emoji, active, onPress, style }: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active ? styles.chipActive : styles.chipInactive,
        pressed && { opacity: 0.8 },
        style,
      ]}
    >
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text
        style={[styles.label, active ? styles.labelActive : styles.labelInactive]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.round,
    gap: 4,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipInactive: {
    backgroundColor: colors.pink100,
    borderWidth: 1,
    borderColor: colors.pink200,
  },
  emoji: {
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.white,
  },
  labelInactive: {
    color: colors.textSecondary,
  },
});
