import React, { useState, useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet, Pressable, Text, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Note } from '../types';
import { useNoteStore } from '../store/useNoteStore';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { NoteCard } from '../components/NoteCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { AnimeHeader } from '../components/AnimeHeader';
import { AnimeBackground } from '../theme/animeArt';
import { CategoryChip } from '../components/CategoryChip';
import { formatTodayLong } from '../utils/date';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const notes = useNoteStore((s) => s.notes);
  const categories = useNoteStore((s) => s.categories);
  const togglePin = useNoteStore((s) => s.togglePin);
  const deleteNote = useNoteStore((s) => s.kdeleteNote);

  const filteredNotes = useMemo(() => {
    let result = [...notes];
    if (activeFilter !== 'all') {
      if (activeFilter === 'pinned') {
        result = result.filter((n) => n.isPinned);
      } else {
        result = result.filter((n) => n.categoryId === activeFilter);
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
    }
    result.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return b.updatedAt - a.updatedAt;
    });
    return result;
  }, [notes, activeFilter, searchQuery]);

  const handleNotePress = useCallback((note: Note) => {
    navigation.navigate('NoteEditor', { noteId: note.id });
  }, [navigation]);

  const handleNewNote = useCallback(() => {
    navigation.navigate('NoteEditor', {});
  }, [navigation]);

  const handleLongPress = useCallback((note: Note) => {
    Alert.alert(note.title, undefined, [
      { text: note.isPinned ? 'Unpin' : 'Pin', onPress: () => togglePin(note.id) },
      { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Delete Note', 'Are you sure?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => deleteNote(note.id) }]) },
      { text: 'Cancel', style: 'cancel' },
    ]) }, [togglePin, deleteNote]);

  const renderItem = useCallback(({ item }: { item: Note }) => (
    <Pressable onLongPress={() => handleLongPress(item)}>
      <NoteCard note={item} onPress={handleNotePress} />
    </Pressable>
  ), [handleNotePress, handleLongPress]);

  return (
    <AnimeBackground>
      <View style={styles.header}>
        <AnimeHeader title="Anime Notes" subtitle={formatTodayLong()} />
      </View>

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <FlatList
        horizontal
        data={[{ id: 'all', name: 'All', emoji: '\u2728' }, { id: 'pinned', name: 'Pinned', emoji: '\u2B50' }, ...categories.map((c) => ({ id: c.id, name: c.name, emoji: c.emoji }))]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (<CategoryChip label={item.name} emoji={item.emoji} active={activeFilter === item.id} onPress={() => setActiveFilter(item.id)} />)}
        contentContainerStyle={styles.filterList}
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title={searchQuery ? 'No notes found' : 'No notes yet!'}
            message={searchQuery ? 'Try a different search term.' : 'Tap the button below to create your first sparkly note! \u2728'}
          />
        }
      />

      <FloatingActionButton onPress={handleNewNote} label="New Note" />
    </AnimeBackground>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: spacing.lg },
  filterList: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm, gap: spacing.xs },
  list: { paddingHorizontal: spacing.xs, paddingBottom: 140 },
  row: { gap: 0 },
});
