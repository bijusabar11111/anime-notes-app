import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Share } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius, shadows } from '../theme/spacing';
import { AnimeHeader } from '../components/AnimeHeader';
import { AnimeBackground, AnimeMascot, Sparkle, Star, Heart } from '../theme/animeArt';
import { useNoteStore } from '../store/useNoteStore';

export function SettingsScreen() {
  const notes = useNoteStore((s) => s.notes);
  const categories = useNoteStore((s) => s.categories);

  const pinnedCount = notes.filter((n) => n.isPinned).length;

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          'Check out Anime Notes — a cute anime-style notes app! \u2728',
      });
    } catch {
      // user cancelled
    }
  };

  const handleAbout = () => {
    Alert.alert(
      'Anime Notes \u2728',
      'Version 1.0.0\n\nA cute, anime-inspired notes app with white & pink theme.\nBuilt with React Native + Expo + TypeScript.\n\nMade with \u2764\uFE0F for anime fans.',
      [{ text: 'OK' }]
    );
  };

  return (
    <AnimeBackground>
      <View style={styles.header}>
        <AnimeHeader title="Profile" subtitle="Your anime notes stats" />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.mascotWrap}>
          <AnimeMascot size={80} />
          <Sparkle size={12} color={colors.sparkle} style={{ position: 'absolute', top: 0, right: 0 }} />
        </View>
        <Text style={styles.profileName}>Anime Fan</Text>
        <Text style={styles.profileSub}>Note enthusiast \u2728</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{notes.length}</Text>
          <Text style={styles.statLabel}>Notes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{categories.length}</Text>
          <Text style={styles.statLabel}>Folders</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{pinnedCount}</Text>
          <Text style={styles.statLabel}>Pinned</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Pressable
          onPress={handleShare}
          style={({ pressed }) => [styles.menuItem, pressed && { opacity: 0.7 }]}
        >
          <Star size={14} color={colors.primary} />
          <Text style={styles.menuText}>Share App</Text>
          <Text style={styles.menuArrow}>\u203A</Text>
        </Pressable>

        <Pressable
          onPress={handleAbout}
          style={({ pressed }) => [styles.menuItem, pressed && { opacity: 0.7 }]}
        >
          <Heart size={14} color={colors.heart} />
          <Text style={styles.menuText}>About</Text>
          <Text style={styles.menuArrow}>\u203A</Text>
        </Pressable>

        <View style={styles.menuItem}>
          <Sparkle size={14} color={colors.sparkle} />
          <Text style={styles.menuText}>Version</Text>
          <Text style={styles.versionText}>1.0.0</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with \u2764\uFE0F \u2022 Anime Notes</Text>
      </View>
    </AnimeBackground>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: spacing.lg },
  profileCard: { alignItems: 'center', backgroundColor: colors.white, marginHorizontal: spacing.lg, borderRadius: radius.xxl, paddingVertical: spacing.xxl, marginBottom: spacing.lg, ...shadows.card },
  mascotWrap: { position: 'relative', marginBottom: spacing.md },
  profileName: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  profileSub: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  statsRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.md, marginBottom: spacing.xl },
  statCard: { flex: 1, backgroundColor: colors.white, borderRadius: radius.lg, paddingVertical: spacing.lg, alignItems: 'center', ...shadows.card },
  statNumber: { fontSize: 24, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  menuSection: { backgroundColor: colors.white, marginHorizontal: spacing.lg, borderRadius: radius.lg, overflow: 'hidden', ...shadows.card },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.lg, paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.gray100, gap: spacing.md },
  menuText: { flex: 1, fontSize: 15, fontWeight: '500', color: colors.textPrimary },
  menuArrow: { fontSize: 20, color: colors.textMuted },
  versionText: { fontSize: 14, color: colors.textMuted },
  footer: { alignItems: 'center', paddingVertical: spacing.xxl },
  footerText: { fontSize: 13, color: colors.textMuted },
});
