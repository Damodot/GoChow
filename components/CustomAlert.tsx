import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Modal,
    Platform,
    View,
    useColorScheme
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from '../hooks/useFonts';
import { Typography } from './Typography';

type IconName = ComponentProps<typeof Ionicons>['name'];
type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface CustomAlertProps {
    visible: boolean;
    type?: AlertVariant;
    variant?: AlertVariant;
    message: string;
    title?: string;
    onClose?: () => void;
}

const ICONS: Record<AlertVariant, { name: IconName; color: string; darkColor: string }> = {
    success: { name: 'checkmark-circle', color: '#16A34A', darkColor: '#22C55E' },
    error: { name: 'close-circle', color: '#DC2626', darkColor: '#EF4444' },
    warning: { name: 'warning', color: '#F59E0B', darkColor: '#FBBF24' },
    info: { name: 'information-circle', color: '#3B82F6', darkColor: '#60A5FA' },
};

export default function CustomAlert({
    visible,
    type,
    variant,
    message,
    onClose,
}: CustomAlertProps) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const { fontsLoaded } = useFonts();

    const kind: AlertVariant = (variant ?? type ?? 'info');
    const { name, color, darkColor } = ICONS[kind];
    const iconColor = isDarkMode ? darkColor : color;

    const slideY = useRef(new Animated.Value(-16)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (!visible) return;

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 220,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(slideY, {
                toValue: 0,
                duration: 220,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();

        const t = setTimeout(() => {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 220,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(slideY, {
                    toValue: -16,
                    duration: 220,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start(({ finished }) => {
                if (finished) onClose?.();
            });
        }, 3000);

        return () => clearTimeout(t);
    }, [visible, onClose, opacity, slideY]);

    if (!visible || !fontsLoaded) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            statusBarTranslucent={Platform.OS === 'android'}
        >
            <SafeAreaView className="flex-1 bg-transparent" pointerEvents="box-none">
                <View className="items-center" style={{ paddingTop: insets.top ? 8 : 12 }}>
                    <Animated.View
                        className={`w-[92%] rounded-xl px-3.5 py-3 flex-row items-center ${isDarkMode
                                ? 'bg-gray-800 shadow-lg shadow-black/30'
                                : 'bg-white shadow-md shadow-black/12'
                            }`}
                        style={{
                            opacity: opacity,
                            transform: [{ translateY: slideY }],
                        }}
                    >
                        <Ionicons
                            name={name}
                            size={24}
                            color={iconColor}
                            className="mr-2.5"
                        />
                        <Typography
                            variant="body"
                            className="flex-1"
                            style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                        >
                            {message}
                        </Typography>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}