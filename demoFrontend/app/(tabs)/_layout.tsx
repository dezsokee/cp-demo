import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { LogBox } from 'react-native';

export default function TabLayout() {

  LogBox.ignoreLogs(['Warning: ...']);

  LogBox.ignoreAllLogs(true);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2d4551",
        tabBarShowLabel: false,
        headerShown: false,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'camera' : 'camera'} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
