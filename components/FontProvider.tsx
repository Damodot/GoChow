// components/FontProvider.tsx
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useGlobalFonts } from '../hooks/useGlobalFonts';

interface FontProviderProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ 
  children, 
  loadingComponent 
}) => {
  const { fontsLoaded, fontsError } = useGlobalFonts();

  if (fontsError) {
    console.error('Failed to load fonts:', fontsError);
  }

  if (!fontsLoaded) {
    return loadingComponent || (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#004aa9" />
      </View>
    );
  }

  return <>{children}</>;
};