// components/Loader.tsx

import React from 'react';
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native';

export default function Loader() {
    const positionAnim = new Animated.Value(-80);
    const scaleAnim = new Animated.Value(1);
    const opacityAnim = new Animated.Value(0.6);

    // Animation 1: Move left to right (like `l4-1`)
    Animated.loop(
        Animated.timing(positionAnim, {
            toValue: 80,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        })
    ).start();

    // Animation 2: Pulse effect (like `l4-2` glow with clip-path)
    Animated.loop(
        Animated.sequence([
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1.8,
                    duration: 330,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 330,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(170),
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 330,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0.6,
                    duration: 330,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(170),
        ])
    ).start();

    const animatedStyle = {
        transform: [
            { translateX: positionAnim },
            { scale: scaleAnim },
        ],
        opacity: opacityAnim,
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.loader, animatedStyle]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
    },
    loader: {
        width: 8,
        height: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        // Simulate glow with shadow (no blurRadius in RN, so use elevation on Android, shadow on iOS)
        ...Platform.select({
            ios: {
                shadowColor: 'white',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 15,
            },
            android: {
                elevation: 8,
            },
        }),
    },
});