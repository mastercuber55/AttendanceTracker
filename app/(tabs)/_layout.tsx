import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { useTheme } from 'react-native-paper';

import { HapticTab } from '@/components/HapticTab';
import { Icon } from 'react-native-paper';
import * as NavigationBar from 'expo-navigation-bar';

const data = [
  { name: "index", label: "Dashboard", icon: "view-dashboard"},
  { name: "calendar", label: "Calendar", icon: "calendar-check"},
]
export default function Layout() {
  const theme = useTheme();
  
  NavigationBar.setBackgroundColorAsync(theme.colors.surface);


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          elevation: 4, // Shadow effect on Android
          shadowOpacity: 0.1, // Light shadow on iOS
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
        tabBarButton: HapticTab, // Custom button for haptic feedback
      }}
    >
      {data.map(({ name, label, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarLabel: label,
            tabBarIcon: ({ color, size }) => <Icon source={icon} theme={theme} size={24} />,
          }}
        />
      ))}
    </Tabs>
  );
}