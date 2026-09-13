import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootStackParamList } from '../types';
import { HomeScreen } from '../screens/HomeScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { NoteEditorScreen } from '../screens/NoteEditorScreen';
import { CategoryNotesScreen } from '../screens/CategoryNotesScreen';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Star, Sparkle, Heart } from '../theme/animeArt';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// ── Tab icons (programmatic) ──
function TabIcon({ route, color, size }: { route: string; color: string; size: number }) {
  if (route === 'Home') return <Sparkle size={size} color={color} />;
  if (route === 'Categories') return <Star size={size} color={color} />;
  if (route === 'Settings') return <Heart size={size - 2} color={color} />;
  return <Sparkle size={size} color={color} />;
}

// ── Main tab navigator ──
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <TabIcon route={route.name} color={color} size={size} />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.pink200,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Notes' }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ tabBarLabel: 'Folders' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// ── Root stack navigator ──
export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.pink50,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.pink50,
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NoteEditor"
        component={NoteEditorScreen}
        options={{ title: 'Edit Note', headerShown: false }}
      />
      <Stack.Screen
        name="CategoryNotes"
        component={CategoryNotesScreen}
        options={{ title: 'Category' }}
      />
    </Stack.Navigator>
  );
}
