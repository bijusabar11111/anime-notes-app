import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Text,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { useNoteStore } from '../store/useNoteStore';
import { colors } from '../theme/colors';
import { spacing, radius, shadows } from '../theme/spacing';
import { AnimeHeader } from '../components/AnimeHeader';
import { AnimeBackground, Sparkle, Star } from '../theme/animeArt';

type Props = NativeStackScreenProps<RootStackParamList, 'Categories'>;

const EMOJI_OPTIONS = [
  '\u2728', '\uD83D\uDCC6', '\uD83D\uDCA1', '\uD83D\uDCD8',
  '\u2705', '\uD83C\uDFA8', '\uD83D\uDCBB', '\uD83C\uDFB5',
  '\uD83D\uDCAB', '\uD83D\uDCBC', '\uD83C\uDFE0', '\u270D\uFE0F',
];

export function CategoriesScreen({ navigation }: Props) {
  const categories = useNoteStore((s) => s.categories);
  const notes = useNoteStore((s) => s.notes);
  const addCategory = useNoteStore((s) => s.addCategory);
  const deleteCategory = useNoteStore((s) => s.deleteCategory);

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0]);

  const getNoteCount = useCallback(
    (catId: string) => notes.filter((n) => n.categoryId === catId).length,
    [notes]
  );

  const handleCategoryPress = useCallback(
    (catId: string) => {
      navigation.navigate('CategoryNotes', { categoryId: catId });
    },
    [navigation]
  );

  const handleCategoryLongPress = useCallback(
    (catId: string, name: string) => {
      Alert.alert(name, 'What would you like to do?', [
        {
          text: 'Delete Category',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Delete Category',
              `Delete "${name}"? Notes will be moved to uncategorized.`,
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => deleteCategory(catId),
                },
              ]
            );
         },
        },
        { text: 'Cancel', style: 'cancel' },
      ]);
    },
    [deleteCategory]
  );

  const handleSaveCategory = useCallback(() => {
    if (newName.trim()) {
      addCategory(newName, selectedEmoji);
      setNewName('');
      setSelectedEmoji(EMOJI_OPTIONS[0]);
      setModalVisible(false);
    }
  }, [newName, selectedEmoji, addCategory]);

  const renderItem = useCallback(
    ({ item, index }: { item: typeof categories[0]; index: number }) => {
      const count = getNoteCount(item.id);
      return (
        <Pressable
          onPress={() => handleCategoryPress(item.id)}
          onLongPress={() => handleCategoryLongPress(item.id, item.name)}
          style={({ pressed }) => [
            styles.categoryCard,
            pressed && styles.cardPressed,
          ]}
        >
          <View style={styles.emojiCircle}>
            <Text style={styles.emoji}>{item.emoji}</Text>
          </View>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.noteCount}>
              {count} {count === 1 ? 'note' : 'notes'}
            </Text>
          </View>
          {index % 2 === 0 ? (
            <Sparkle size={12} color={colors.pink300} style={{ opacity: 0.5 }} />
          ) : (
            <Star size={10} color={colors.starYellow} style={{ opacity: 0.5 }} />
          )}
        </Pressable>
      );
    },
    [getNoteCount, handleCategoryPress, handleCategoryLongPress]
  );

  return (
    <AnimeBackground>
      <View style={styles.header}>
        <AnimeHeader title="Folders" subtitle="Organize your notes" />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No categories yet!</Text>
          </View>
        }
      />

      <Pressable
        onPress={() => setModalVisible(true)}
        style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.85 }]}
      >
        <Text style={styles.addButtonText}>+ New Folder</Text>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Folder \u2728</Text>

            <TextInput
              style={styles.textInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Folder name..."
              placeholderTextColor={colors.textMuted}
              autoFocus
            />

            <Text style={styles.emojiLabel}>Pick an emoji:</Text>
            <View style={styles.emojiRow}>
              {EMOJI_OPTIONS.map((emoji) => (
                <Pressable
                  key={emoji}
                  onPress={() => setSelectedEmoji(emoji)}
                  style={[
                    styles.emojiOption,
                    selectedEmoji === emoji && styles.emojiSelected,
                  ]}
                >
                  <Text style={styles.emojiOptionText}>{emoji}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleSaveCategory} style={styles.saveButton}>
                <Text style={styles.saveText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </AnimeBackground>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: spacing.lg },
  list: { paddingHorizontal: spacing.lg, paddingBottom: 120 },
  categoryCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadows.card },
  cardPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  emojiCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.pink100, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  emoji: { fontSize: 22 },
  categoryInfo: { flex: 1 },
  categoryName: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  noteCount: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  emptyWrap: { alignItems: 'center', paddingVertical: spacing.huge },
  emptyText: { fontSize: 16, color: colors.textSecondary },
  addButton: { position: 'absolute', bottom: spacing.xl + 60, right: spacing.lg, backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingVertical: spacing.md + 2, borderRadius: radius.xxl, ...shadows.floating },
  addButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(42,37,48,0.5)', padding: spacing.lg },
  modalContent: { width: '100%', backgroundColor: colors.white, borderRadius: radius.xxl, padding: spacing.xxl },
  modalTitle: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.lg, textAlign: 'center' },
  textInput: { borderWidth: 1, borderColor: colors.pink200, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, fontSize: 15, color: colors.textPrimary, marginBottom: spacing.lg },
  emojiLabel: { fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.sm },
  emojiRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  emojiOption: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.pink50, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'transparent' },
  emojiSelected: { borderColor: colors.primary, backgroundColor: colors.pink100 },
  emojiOptionText: { fontSize: 18 },
  modalButtons: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  cancelButton: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, backgroundColor: colors.gray100, alignItems: 'center' },
  cancelText: { color: colors.textSecondary, fontSize: 15, fontWeight: '600' },
  saveButton: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: 'center' },
  saveText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
