import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors } from './colors';

/**
 * Programmatic anime-style decorative elements.
 * No image assets needed — everything is drawn with Views.
 * Aesthetic: shoujo manga — stars, sparkles, ribbons, dots.
 * Deliberately NOT sakura petals.
 */

// ── Sparkle (four-point star) ──
export function Sparkle({
  size = 12,
  color = colors.sparkle,
  style,
}: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          transform: [{ rotate: '45deg' }],
        },
        style,
      ]}
    >
      <View
        style={{
          position: 'absolute',
          width: size * 0.3,
          height: size,
          backgroundColor: color,
          borderRadius: size * 0.15,
          left: size * 0.35,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size * 0.3,
          backgroundColor: color,
          borderRadius: size * 0.15,
          top: size * 0.35,
        }}
      />
    </View>
  );
}

// ── Five-point star ──
export function Star({
  size = 16,
  color = colors.starYellow,
  style,
}: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  // simplified star using two rotated squares
  return (
    <View style={[{ width: size, height: size }, style]}>
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size * 0.15,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size * 0.15,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

// ── Heart shape ──
export function Heart({
  size = 14,
  color = colors.heart,
  style,
}: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const half = size / 2;
  return (
    <View style={[{ width: size, height: size, flexDirection: 'row' }, style]}>
      <View
        style={{
          width: half,
          height: half,
          borderRadius: half,
          backgroundColor: color,
          marginTop: 0,
          marginRight: -half * 0.25,
        }}
      />
      <View
        style={{
          width: half,
          height: half,
          borderRadius: half,
          backgroundColor: color,
          marginLeft: -half * 0.25,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.7,
          backgroundColor: color,
          top: size * 0.3,
          left: size * 0.15,
          transform: [{ rotate: '45deg' }],
          borderRadius: size * 0.05,
        }}
      />
    </View>
  );
}

// ── Small dot (decorative) ──
export function Dot({
  size = 6,
  color = colors.primaryLight,
  style,
}: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

// ── Decorative background pattern — scattered sparkles & stars ──
export function AnimeBackground({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.bgContainer}>
      {/* Scattered decorative elements */}
      <Sparkle size={20} color={colors.pink300} style={{ position: 'absolute', top: 60, right: 20, opacity: 0.6 }} />
      <Star size={12} color={colors.starYellow} style={{ position: 'absolute', top: 120, left: 30, opacity: 0.5 }} />
      <Dot size={8} color={colors.pink200} style={{ position: 'absolute', top: 200, right: 40, opacity: 0.7 }} />
      <Sparkle size={14} color={colors.sparkle} style={{ position: 'absolute', top: 300, left: 15, opacity: 0.4 }} />
      <Heart size={10} color={colors.pink300} style={{ position: 'absolute', bottom: 200, right: 25, opacity: 0.4 }} />
      <Dot size={6} color={colors.primaryLight} style={{ position: 'absolute', bottom: 120, left: 40, opacity: 0.5 }} />
      <Star size={8} color={colors.gold} style={{ position: 'absolute', bottom: 280, right: 60, opacity: 0.4 }} />
      <Sparkle size={16} color={colors.pink400} style={{ position: 'absolute', bottom: 60, left: 20, opacity: 0.3 }} />
      {children}
    </View>
  );
}

// ── Anime girl mascot face (kawaii style, programmatic) ──
export function AnimeMascot({ size = 80 }: { size?: number }) {
  const eyeSize = size * 0.08;
  const eyeSpacing = size * 0.22;
  const cheekOffset = size * 0.18;

  return (
    <View style={mascotStyles.container(size)}>
      {/* Hair top — pink */
      }
      <View style={mascotStyles.hairTop(size)} />
      {/* Hair sides */}
      <View style={mascotStyles.hairLeft(size)} />
      <View style={mascotStyles.hairRight(size)} />
      {/* Face */}
      <View style={mascotStyles.face(size)}>
        {/* Eyes */}
        <View style={mascotStyles.eyeRow(size)}>
          <View style={mascotStyles.eye(eyeSize)}>
            <View style={mascotStyles.eyeShine(eyeSize)} />
          </View>
          <View style={mascotStyles.eye(eyeSize)}>
            <View style={mascotStyles.eyeShine(eyeSize)} />
          </View>
        </View>
        {/* Blush cheeks */}
        <View style={mascotStyles.cheek(eyeSize * 1.5, -cheekOffset)} />
        <View style={mascotStyles.cheek(eyeSize * 1.5, cheekOffset)} />
        {/* Mouth — small smile */}
        <View style={mascotStyles.mouth(size)} />
      </View>
      {/* Hair bow accent */}
      <View style={mascotStyles.bow(size)} />
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: colors.pink50,
  },
});

const mascotStyles = StyleSheet.create({
  container: (size: number) => ({
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  hairTop: (size: number) => ({
    position: 'absolute',
    top: 0,
    width: size * 0.95,
    height: size * 0.45,
    backgroundColor: colors.primary,
    borderTopLeftRadius: size * 0.5,
    borderTopRightRadius: size * 0.5,
    borderBottomLeftRadius: size * 0.25,
    borderBottomRightRadius: size * 0.25,
    zIndex: 1,
  }),
  hairLeft: (size: number) => ({
    position: 'absolute',
    top: size * 0.3,
    left: -size * 0.02,
    width: size * 0.18,
    height: size * 0.55,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: size * 0.15,
    borderBottomRightRadius: size * 0.05,
    zIndex: 1,
  }),
  hairRight: (size: number) => ({
    position: 'absolute',
    top: size * 0.3,
    right: -size * 0.02,
    width: size * 0.18,
    height: size * 0.55,
    backgroundColor: colors.primary,
    borderBottomRightRadius: size * 0.15,
    borderBottomLeftRadius: size * 0.05,
    zIndex: 1,
  }),
  face: (size: number) => ({
    position: 'absolute',
    top: size * 0.2,
    width: size * 0.6,
    height: size * 0.65,
    backgroundColor: '#FFF5F8',
    borderRadius: size * 0.3,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  eyeRow: (size: number) => ({
    flexDirection: 'row',
    gap: size * 0.12,
    marginBottom: size * 0.02,
  }),
  eye: (eyeSize: number) => ({
    width: eyeSize,
    height: eyeSize * 1.4,
    backgroundColor: colors.gray800,
    borderRadius: eyeSize * 0.7,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  }),
  eyeShine: (eyeSize: number) => ({
    width: eyeSize * 0.4,
    height: eyeSize * 0.4,
    backgroundColor: colors.white,
    borderRadius: eyeSize * 0.2,
    marginRight: eyeSize * 0.1,
    marginTop: eyeSize * 0.15,
  }),
  cheek: (size: number, offset: number) => ({
    position: 'absolute',
    bottom: '20%',
    left: '50%',
    marginLeft: offset - size / 2,
    width: size,
    height: size * 0.6,
    backgroundColor: colors.pink300,
    borderRadius: size * 0.3,
    opacity: 0.6,
  }),
  mouth: (size: number) => ({
    width: size * 0.1,
    height: size * 0.05,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryDark,
    borderRadius: size * 0.05,
    marginTop: size * 0.01,
  }),
  bow: (size: number) => ({
    position: 'absolute',
    top: 0,
    right: size * 0.15,
    width: size * 0.2,
    height: size * 0.1,
    backgroundColor: colors.ribbon,
    borderRadius: size * 0.05,
    zIndex: 3,
    transform: [{ rotate: '15deg' }],
  }),
});
