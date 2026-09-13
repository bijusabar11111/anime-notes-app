/**
 * Core type definitions for Anime Notes app.
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  categoryId: string | null;
  createdAt: number;
  updatedAt: number;
  isPinned: boolean;
  color: NoteColor;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  createdAt: number;
}

export type NoteColor =
  | 'pink'
  | 'rose'
  | 'blush'
  | 'coral'
  | 'lavender'
  | 'mint'
  | 'sky'
  | 'cream';

export interface AppSettings {
  displayName: string;
  theme: 'light' | 'dark';
}

export type RootStackParamList = {
  Home: undefined;
  Categories: undefined;
  Settings: undefined;
  NoteEditor: { noteId?: string; categoryId?: string | null };
  CategoryNotes: { categoryId: string };
};
