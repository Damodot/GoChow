// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import '../global.css';

export const unstable_settings = {
  initialRouteName: 'index', 
};

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/signup" />
      {/* <Stack.Screen name="login" /> */}
    </Stack>
  );
}
