import { useColorScheme } from 'nativewind';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const bg = isDark ? '#1e2f40' : '#ffffff';  
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
                <Text>
                    This is SettingsScreen
                </Text>
            </SafeAreaView>
        </>
    )
}

export default SettingsScreen