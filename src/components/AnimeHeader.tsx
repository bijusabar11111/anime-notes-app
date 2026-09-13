import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Sparkle, Star, Heart } from '../theme/animeArt';

interface AnimeHeaderProps {
  title: string;
  subtitle?: string;
}

export function AnimeHeader({ title, subtitle }: AnimeHeaderProps) {
  return (
    <View style={styles.container}>
      <Sparkle size={18} color={colors.pink300} style={styles.sparkle1} />
      <Star size={10} color={colors.starYellow} style={styles.star1} />
      <Heart size={8} color={colors.pink200} style={styles.heart1} />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <Sparkle size={12} color={colors.sparkle} style={styles.sparkle2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    position: 'relative',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sparkle1: {
    position: 'absolute',
    top: 10,
    right: 16,
    opacity: 0.6,
  },
  star1: {
    position: 'absolute',
    top: 40,
    right: 40,
    opacity: 0.5,
  },
  heart1: {
    position: 'absolute',
    bottom: 10,
    right: 24,
    opacity: 0.4,
  },
  sparkle2: {
    position: 'absolute',
    bottom: 15,
    left: 4,
    opacity: 0.4,
  },
});
