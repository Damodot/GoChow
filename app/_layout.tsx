// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontProvider } from '../components/FontProvider';
import '../global.css';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FontProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth/Login" />
          <Stack.Screen name="auth/Signup" />
          <Stack.Screen name="auth/OtpVerifyReset" />
          <Stack.Screen name="auth/ResetPassword" />
          <Stack.Screen name="auth/CreateNewPassword" />
          <Stack.Screen name="auth/PasswordChangeConfirmed" />
          <Stack.Screen name="dashboard/index" />
          <Stack.Screen name="dashboard/HomeScreen" />
          <Stack.Screen name="dashboard/ExtrasScreen" />
          <Stack.Screen name="dashboard/PaymentScreen" />
          <Stack.Screen name="dashboard/ProfileScreen" />
          <Stack.Screen name="dashboard/SettingsScreen" />
          <Stack.Screen name="Onboarding/OnboardingScreen" />
        </Stack>
      </FontProvider>
    </GestureHandlerRootView>
  );
}