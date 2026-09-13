/**
 * Color palette — Japanese anime girl inspired, white & pink.
 * Deliberately NOT sakura / cherry-blossom themed.
 * Aesthetic: cute, sparkly, ribbon-and-star shoujo manga vibes.
 */

export const colors = {
  // ── Primary pinks ──
  primary: '#FF69B4',       // Hot pink — main accent
  primaryDark: '#E0559A',  // Deep pink — pressed / active
  primaryLight: '#FFB6D9', // Soft pink — backgrounds
  pink50: '#FFF0F5',       // Lavender blush — page bg
  pink100: '#FFE4EF',      // Very light pink — card bg
  pink200: '#FFCFE0',      // Light pink — chips
  pink300: '#FFB0CB',      // Medium-light pink
  pink400: '#FF85B5',       // Medium pink
  pink500: '#FF5FA0',       // Bright pink

  // ── Whites & neutrals ──
  white: '#FFFFFF',
  offWhite: '#FFFCFE',
  snow: '#FAF7FA',
  gray50: '#F9F7F9',
  gray100: '#F2EEF1',
  gray200: '#E5DEE4',
  gray300: '#D0C7CF',
  gray400: '#A89BAA',
  gray500: '#807488',
  gray600: '#5C5263',
  gray700: '#3F3845',
  gray800: '#2A2530',
  gray900: '#1A1620',

  // ── Note card colors ──
  notePink: '#FFE0EC',
  noteRose: '#FFD4DA',
  noteBlush: '#FFE8E8',
  noteCoral: '#FFDDD2',
  noteLavender: '#EDE0FF',
  noteMint: '#D4F5E5',
  noteSky: '#D9EEFF',
  noteCream: '#FFF8E1',

  // ── Accents ──
  gold: '#FFD700',
  starYellow: '#FFE66D',
  ribbon: '#FF4081',
  sparkle: '#FF8AC4',
  heart: '#FF6B9D',

  // ── Status ──
  success: '#4ECDC4',
  warning: '#FFE66D',
  danger: '#FF6B6B',
  info: '#6CC8FF',

  // ── Text ──
  textPrimary: '#2A2530',
  textSecondary: '#807488',
  textMuted: '#A89BAA',
  textOnPink: '#FFFFFF',
  textOnWhite: '#3F3845',
} as const;

export type ColorKey = keyof typeof colors;

/** Map note color keys to their background values */
export const noteColorMap: Record<string, string> = {
  pink: colors.notePink,
  rose: colors.noteRose,
  blush: colors.noteBlush,
  coral: colors.noteCoral,
  lavender: colors.noteLavender,
  mint: colors.noteMint,
  sky: colors.noteSky,
  cream: colors.noteCream,
};

/** Note color options for the picker */
export const noteColorOptions = [
  { key: 'pink', label: 'Pink', color: colors.notePink },
  { key: 'rose', label: 'Rose', color: colors.noteRose },
  { key: 'blush', label: 'Blush', color: colors.noteBlush },
  { key: 'coral', label: 'Coral', color: colors.noteCoral },
  { key: 'lavender', label: 'Lavender', color: colors.noteLavender },
  { key: 'mint', label: 'Mint', color: colors.noteMint },
  { key: 'sky', label: 'Sky', color: colors.noteSky },
  { key: 'cream', label: 'Cream', color: colors.noteCream },
] as const;
