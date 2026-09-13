import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius, shadows } from '../theme/spacing';
import { Sparkle } from '../theme/animeArt';

interface FloatingActionButtonProps {
  onPress: () => void;
  label?: string;
}

export function FloatingActionButton({ onPress, label }: FloatingActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Sparkle size={16} color={colors.white} style={{ marginRight: spacing.xs }} />
      <Text style={styles.label}>{label || 'New Note'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: spacing.xl + 60,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.xxl,
    ...shadows.floating,
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
