import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Gradient, Icon} from '../components';
import type {IconName} from '../components/Icon';
import type {TabParamList} from './types';
import {colors, shadows, spacing, typography} from '../theme';

const ICON: Record<keyof TabParamList, IconName> = {
  Home: 'home',
  Explore: 'explore',
  Create: 'create',
  Credits: 'credits',
  Profile: 'profile',
};

export function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, Platform.OS === 'android' ? 10 : 0);

  return (
    <View style={[styles.bar, {paddingBottom: bottom, height: 64 + bottom}]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const {options} = descriptors[route.key];
        const label = (options.title ?? route.name) as string;
        const name = route.name as keyof TabParamList;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (name === 'Create') {
          return (
            <Pressable key={route.key} onPress={onPress} style={styles.fabSlot}>
              <Gradient name="brand" style={styles.fab}>
                <Icon name="create" color={colors.onPrimary} size={26} active />
              </Gradient>
              <Text style={styles.fabLabel}>{label}</Text>
            </Pressable>
          );
        }

        const tint = focused ? colors.primary : colors.faint;
        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={{selected: focused}}
            style={styles.item}>
            <Icon name={ICON[name]} color={tint} active={focused} size={24} />
            <Text style={[styles.label, {color: tint}]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
    backgroundColor: colors.bgElevated,
    borderTopColor: colors.hairline,
    borderTopWidth: 1,
    ...shadows.lg,
  },
  item: {flex: 1, alignItems: 'center', gap: 4},
  label: {...typography.label, fontSize: 11},
  fabSlot: {flex: 1, alignItems: 'center', gap: 4},
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
    borderWidth: 4,
    borderColor: colors.bgElevated,
    ...shadows.button,
  },
  fabLabel: {...typography.label, fontSize: 11, color: colors.primary},
});
