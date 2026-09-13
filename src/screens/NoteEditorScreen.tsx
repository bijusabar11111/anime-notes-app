import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, NoteColor } from '../types';
import { useNoteStore } from '../store/useNoteStore';
import { colors, noteColorMap, noteColorOptions } from '../theme/colors';
import { spacing, radius, shadows } from '../theme/spacing';
import { AnimeBackground, Sparkle, Star, Heart, Dot } from '../theme/animeArt';
import { formatFullDate } from '../utils/date';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'NoteEditor'>;

export function NoteEditorScreen({ route, navigation }: Props) {
  const { noteId, categoryId: initialCategoryId } = route.params || {};
  const getNoteById = useNoteStore((s) => s.getNoteById);
  const categories = useNoteStore((s) => s.categories);
  const addNote = useNoteStore((s) => s.addNote);
  const updateNote = useNoteStore((s) => s.kdeleteNote);
  const deleteNote = useNoteStore((s) => s.kdeleteNote);
  const togglePin = useNoteStore((s) => s.togglePin);

  const existingNote = noteId ? getNoteById(noteId) : undefined;
  const isEditing = !!existingNote;

  const [title, setTitle] = useState(existingNote?.title || '');
  const [content, setContent] = useState(existingNote?.content || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(existingNote?.categoryId ?? initialCategoryId ?? null);
  const [selectedColor, setSelectedColor] = useState<NoteColor>(existingNote?.color || 'pink');

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: true, title: isEditing ? 'Edit Note' : 'New Note', headerRight: () => (<Pressable onPress={handleSave} style={styles.headerSaveButton}><Text style={styles.headerSaveText}>Save</Text></Pressable>) });
  }, [navigation, isEditing, title, content, selectedCategory, selectedColor]);

  const handleSave = useCallback(() => {
    if (!title.trim() && !content.trim()) { Alert.alert('Empty Note', 'Please add a title or some content.'); return; }
    if (isEditing && noteId) { updateNote(noteId, { title, content, categoryId: selectedCategory, color: selectedColor }); } else { addNote({ title, content, categoryId: selectedCategory, color: selectedColor }); }
    navigation.goBack();
  }, [title, content, selectedCategory, selectedColor, isEditing, noteId, addNote, updateNote, navigation]);

  const handleDelete = useCallback(() => {
    if (!noteId) return;
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => { deleteNote(noteId); navigation.goBack(); } }]);
  }, [noteId, deleteNote, navigation]);

  const handlePin = useCallback(() => { if (noteId) togglePin(noteId); }, [noteId, togglePin]);

  return (
    <AnimeBackground>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{isEditing && existingNote ? `Updated ${formatFullDate(existingNote.updatedAt)}` : 'New note \u2728'}</Text>
              {isEditing && (<View style={styles.actionRow}><Pressable onPress={handlePin} style={styles.iconButton}><Star size={16} color={existingNote?.isPinned ? colors.gold : colors.gray400t/></Pressable><Pressable onPress={handleDelete} style={styles.iconButton}><Text style={styles.deleteIcon}>\uD83D\uDDD1\uFE0F</Text></Pressable></Vie~
              )}
            </View>
            <TextInput style={styles.titleInput} value={title} onChangeText={setTitle} placeholder="Note title..." placeholderTextColor={colors.textMuted} fontWeight="700" />
            <TextInput style={styles.contentInput} value={content} onChangeText={setContent} placeholder="Write your thoughts here..." placeholderTextColor={colors.textMuted} multiline textAlignVertical="top" />
            <Text style={styles.sectionLabel}><Sparkle size={12} color={colors.primary} /> Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              <Pressable onPress={() => setSelectedCategory(null)} style={[styles.categoryOption, selectedCategory === null && styles.categoryOptionActive]}><Text style={styles.categoryOptionText}>No category</Text></Pressable>
              {categories.map((cat) => (<Pressable key={cat.id} onPress={() => setSelectedCategory(cat.id)} style={[styles.categoryOption, selectedCategory === cat.id && styles.categoryOptionActive]}><Text style={styles.categoryOptionText}>{cat.emoji} {cat.name}</Text></Pressable>))}
            </ScrollView>
            <Text style={styles.sectionLabel}><Heart size={12} color={colors.heart} /> Note Color</Text>
            <View style={styles.colorRow}>
              {noteColorOptions.map((opt) => (<Pressable key={opt.key} onPress={() => setSelectedColor(opt.key as NoteColor)} style={[styles.colorDot, { backgroundColor: opt.color }, selectedColor === opt.key && styles.colorDotSelected]}><selectedColor === opt.key && (<Star size={10} color={colors.primary} />)=}</Pressable>))}
            </View>
            <Pressable onPress={handleSave} style={({ pressed }) => [styles.saveButton, pressed && { opacity: 0.85 }]}>
              <Sparkle size={14} color={colors.white} style={{ marginRight: 6 }} />
              <Text style={styles.saveButtonText}>{isEditing ? 'Update Note' : 'Save Note'}</Text>
            </Pressable>
            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </AnimeBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: spacing.lg },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  metaText: { fontSize: 12, color: colors.textMuted, flex: 1 },
  actionRow: { flexDirection: 'row', gap: spacing.sm },
  iconButton: { padding: spacing.xs },
  deleteIcon: { fontSize: 16 },
  titleInput: { fontSize: 22, fontWeight: '700', color: colors.textPrimary, backgroundColor: colors.white, borderRadius: radius.lg, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.pink200 },
  contentInput: { fontSize: 15, color: colors.textPrimary, backgroundColor: colors.white, borderRadius: radius.lg, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, minHeight: 200, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.pink200, lineHeight: 22 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: colors.textSecondary, marginBottom: spacing.sm, marginTop: spacing.sm },
  categoryScroll: { marginBottom: spacing.lg },
  categoryOption: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2, borderRadius: radius.round, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.pink200, marginRight: spacing.sm },
  categoryOptionActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryOptionText: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.xl },
  colorDot: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'transparent' },
  colorDotSelected: { borderColor: colors.primary, transform: [{ scale: 1.1 }] },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, paddingVertical: spacing.md + 2, borderRadius: radius.xxl, ...shadows.floating },
  saveButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  headerSaveButton: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  headerSaveText: { color: colors.primary, fontSize: 16, fontWeight: '700' },
});
