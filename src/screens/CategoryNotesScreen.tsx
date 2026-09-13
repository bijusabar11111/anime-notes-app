import React, { useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Note } from '../types';
import { useNoteStore } from '../store/useNoteStore';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { NoteCard } from '../components/NoteCard';
import { EmptyState } from '../components/EmptyState';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { AnimeBackground } from '../theme/animeArt';
import { Sparkle, Star } from '../theme/animeArt';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryNotes'>;

export function CategoryNotesScreen({ route, navigation }: Props) {
  const { categoryId } = route.params;
  const getCategoryById = useNoteStore((s) => s.getCategoryById);
  const getNotesByCategory = useNoteStore((s) => s.getNotesByCategory);
  const category = getCategoryById(categoryId);
  const notes = getNotesByCategory(categoryId);

  const handleNotePress = useCallback(
    (note: Note) => {
      navigation.navigate('NoteEditor', { noteId: note.id });
    },
    [navigation]
  );

  const handleNewNote = useCallback(() => {
    navigation.navigate('NoteEditor', { categoryId });
  }, [navigation, categoryId]);

  const title = useMemo(
    () => (category ? `${category.emoji} ${category.name}` : 'Category'),
    [category]
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);

  return (
    <AnimeBackground>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard note={item} onPress={handleNotePress} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title="Empty Folder"
            message="No notes in this folder yet. Create one! \u2728"
          />
        }
      />
      <FloatingActionButton onPress={handleNewNote} label="New Note" />
    </AnimeBackground>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.xs,
    paddingBottom: 140,
  },
  row: {
    gap: 0,
  },
});
