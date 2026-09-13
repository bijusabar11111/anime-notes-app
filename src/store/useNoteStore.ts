import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Note, Category, NoteColor } from '../types';
import { generateId } from '../utils/id';
import { colors } from '../theme/colors';

// ── Default seed categories (non-Sakura themed) ──
const defaultCategories: Category[] = [
  { id: 'cat-personal', name: 'Personal', emoji: '\u2728', createdAt: Date.now() },
  { id: 'cat-study', name: 'Study', emoji: '\uD83D\uDCD6', createdAt: Date.now() },
  { id: 'cat-ideas', name: 'Ideas', emoji: '\uD83D\uDCA1', createdAt: Date.now() },
  { id: 'cat-diary', name: 'Diary', emoji: '\uD83D\uDCD8', createdAt: Date.now() },
  { id: 'cat-tasks', name: 'Tasks', emoji: '\u2705', createdAt: Date.now() },
];

// ── Default seed notes ──
const now = Date.now();
const defaultNotes: Note[] = [
  {
    id: 'seed-1',
    title: 'Welcome to Anime Notes!',
    content:
      '\u3053\u3093\u306B\u3061\u306F\u3001\u30A2\u30CB\u30E1\u30CE\u30FC\u30C8\u3055\u3093\u266A\n\n' +
      'This is your cute anime-style notes app! Create notes, organize them into categories, ' +
      'and keep your thoughts sparkling. \u2728\n\n' +
      'Tap the + button below to create your first note!',
    categoryId: 'cat-personal',
    createdAt: now,
    updatedAt: now,
    isPinned: true,
    color: 'pink',
  },
  {
    id: 'seed-2',
    title: 'Anime Watch List',
    content:
      'Currently watching:\n\u2022 Jujutsu Kaisen\n\u2022 Demon Slayer\n\u2022 Frieren\n\nPlanning to watch:\n\u2022 Spy x Family S2\n\u2022 Chainsaw Man',
    categoryId: 'cat-personal',
    createdAt: now - 86400000,
    updatedAt: now - 3600000,
    isPinned: false,
    color: 'lavender',
  },
  {
    id: 'seed-3',
    title: 'Study Notes — Physics',
    content:
      'Newton\u2019s Laws of Motion:\n1. An object at rest stays at rest unless acted upon.\n2. F = ma\n3. For every action, there is an equal and opposite reaction.',
    categoryId: 'cat-study',
    createdAt: now - 172800000,
    updatedAt: now - 172800000,
    isPinned: false,
    color: 'sky',
  },
  {
    id: 'seed-4',
    title: 'App Ideas \uD83D\uDCA1',
    content:
      '1. A habit tracker with anime rewards\n2. A recipe organizer with manga-style step illustrations\n3. A meditation app with lofi anime backgrounds',
    categoryId: 'cat-ideas',
    createdAt: now - 259200000,
    updatedAt: now - 129600000,
    isPinned: false,
    color: 'mint',
  },
];

interface NoteStore {
  notes: Note[];
  categories: Category[];
  // Note actions
  addNote: (data: { title: string; content: string; categoryId: string | null; color?: NoteColor }) => string;
  updateNote: (id: string, updates: Partial<Pick<Note, 'title' | 'content' | 'categoryId' | 'color' | 'isPinned'>>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  // Category actions
  addCategory: (name: string, emoji: string) => string;
  deleteCategory: (id: string) => void;
  // Selectors
  getNotesByCategory: (categoryId: string) => Note[];
  getNoteById: (id: string) => Note | undefined;
  getCategoryById: (id: string) => Category | undefined;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      notes: defaultNotes,
      categories: defaultCategories,

      addNote: (data) => {
        const id = generateId();
        const ts = Date.now();
        const newNote: Note = {
          id,
          title: data.title.trim() || 'Untitled',
          content: data.content.trim(),
          categoryId: data.categoryId,
          createdAt: ts,
          updatedAt: ts,
          isPinned: false,
          color: data.color || 'pink',
        };
        set((state) => ({ notes: [newNote, ...state.notes] }));
        return id;
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
      },

      togglePin: (id) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, isPinned: !n.isPinned, updatedAt: Date.now() } : n
          ),
        }));
      },

      addCategory: (name, emoji) => {
        const id = generateId();
        const newCategory: Category = {
          id,
          name: name.trim() || 'New Category',
          emoji: emoji || '\uD83D\uDCC1',
          createdAt: Date.now(),
        };
        set((state) => ({ category: [...state.categories, newCategory] }));
        return id;
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
          // Move notes in this category to uncategorized
          notes: state.notes.map((n) =>
            n.categoryId === id ? { ...n, categoryId: null } : n
          ),
        }));
      },

      getNotesByCategory: (categoryId) => {
        return get()
          .notes.filter((n) => n.categoryId === categoryId)
          .sort((a, b) => {
            if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
            return b.updatedAt - a.updatedAt;
          });
      },

      getNoteById: (id) => get().notes.find((n) => n.id === id),

      getCategoryById: (id) => get().categories.find((c) => c.id === id),
      }),
    {
      name: 'anime-notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Export for convenience
export { defaultCategories };
