// components/FontProvider.tsx
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

// Define your font assets
const loadFonts = async () => {
    await Font.loadAsync({
        'Urbanist': require('../assets/fonts/Urbanist-Regular.ttf'),
        'Urbanist-Bold': require('../assets/fonts/Urbanist-Bold.ttf'),
        'Urbanist-SemiBold': require('../assets/fonts/Urbanist-SemiBold.ttf'),
        'Urbanist-Medium': require('../assets/fonts/Urbanist-Medium.ttf'),
        'Urbanist-Light': require('../assets/fonts/Urbanist-Light.ttf'),
    });
};

export const FontContext = React.createContext({
    fontsLoaded: false,
    loadFonts: loadFonts,
});

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        loadFonts()
            .then(() => setFontsLoaded(true))
            .catch(error => {
                console.error('Error loading fonts:', error);
                setFontsLoaded(true); // Continue with default fonts
            });
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading fonts...</Text>
            </View>
        );
    }

    return (
        <FontContext.Provider value={{ fontsLoaded, loadFonts }}>
            {children}
        </FontContext.Provider>
    );
};