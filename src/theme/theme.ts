import { colors } from './colors';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

/** React Navigation light theme — anime pink & white */
export const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.pink50,
    card: colors.white,
    text: colors.textPrimary,
    border: colors.pink200,
    notification: colors.danger,
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
  },
};

export { colors };
