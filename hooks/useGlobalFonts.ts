// hooks/useGlobalFonts.ts
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export const useGlobalFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontsError, setFontsError] = useState<Error | null>(null);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'Urbanist': require('../assets/fonts/Urbanist-Regular.ttf'),
        'Urbanist-Bold': require('../assets/fonts/Urbanist-Bold.ttf'),
        'Urbanist-SemiBold': require('../assets/fonts/Urbanist-SemiBold.ttf'),
        'Urbanist-Medium': require('../assets/fonts/Urbanist-Medium.ttf'),
        // Add any other font weights you need
      });
      setFontsLoaded(true);
    } catch (error) {
      setFontsError(error as Error);
      setFontsLoaded(true); // Still set to true to prevent infinite loading
    }
  };

  return { fontsLoaded, fontsError };
};