import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Note } from '../types';
import { colors, noteColorMap } from '../theme/colors';
import { spacing, radius, shadows } from '../theme/spacing';
import { formatRelativeTime } from '../utils/date';
import { Star, Sparkle } from '../theme/animeArt';
import { useNoteStore } from '../store/useNoteStore';

interface NoteCardProps {
  note: Note;
  onPress: (note: Note) => void;
}

export function NoteCard({ note, onPress }: NoteCardProps) {
  const getCategoryName = useNoteStore((s) => s.getCategoryById);
  const category = note.categoryId ? getCategoryName(note.categoryId) : undefined;
  const bgColor = noteColorMap[note.color] || colors.notePink;

  return (
    <Pressable
      onPress={() => onPress(note)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: bgColor },
        pressed && styles.cardPressed,
      ]}
    >
      {/* Decorative sparkle in corner */}
      <Sparkle size={10} color={colors.pink300} style={{ position: 'absolute', top: 8, right: 8, opacity: 0.4 }} />

      {/* Pinned indicator */}
      {note.isPinned && (
        <View style={styles.pinBadge}>
          <Star size={10} color={colors.gold} />
        </View>
      )}

      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>
        {note.title}
      </Text>

      {/* Content preview */}
      <Text style={styles.preview} numberOfLines={3}>
        {note.content || 'No content'}
      </Text>

      {/* Footer */}
      <View style={styles.footer}>
        {category && (
          <View style={styles.categoryChip}>
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            <Text style={styles.categoryText} numberOfLines={1}>
              {category.name}
            </Text>
          </View>
        )}
        <Text style={styles.date}>{formatRelativeTime(note.updatedAt)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    minHeight: 140,
    ...shadows.card,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  pinBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    paddingRight: spacing.xl,
  },
  preview: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.round,
    gap: 4,
    flexShrink: 1,
  },
  categoryEmoji: {
    fontSize: 11,
  },
  categoryText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  date: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
