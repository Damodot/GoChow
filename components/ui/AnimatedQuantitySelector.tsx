// components/ui/AnimatedQuantitySelector.tsx

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import QuantitySelector from './QuantitySelector';

type AnimatedQuantitySelectorProps = {
    quantity: number;
    onQuantityChange: (q: number) => void;
    visible: boolean;
    onAppear?: () => void;
};

const AnimatedQuantitySelector = ({
    quantity,
    onQuantityChange,
    visible,
    onAppear
}: AnimatedQuantitySelectorProps) => {
    const translateX = useSharedValue(100); // Start off-screen (right)
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            // Animate in
            translateX.value = withSpring(0, {
                damping: 12,
                stiffness: 50,
                mass: 0.8,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            });
            opacity.value = withSpring(1, {
                damping: 14,
                stiffness: 100,
            });
            if (onAppear) runOnJS(onAppear)();
        } else {
            // Animate out
            translateX.value = withSpring(100, { damping: 14, stiffness: 120 });
            opacity.value = withSpring(0);
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            opacity: opacity.value,
        };
    });

    return (
        <View className="flex-1 flex-row items-center justify-end">
            <View
                className="px-1"
                style={[
                    animatedStyle,
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        minWidth: 80,
                    }
                ]}
            >
                <QuantitySelector
                    quantity={quantity}
                    onQuantityChange={onQuantityChange}
                />
            </View>
        </View>
    );
};

export default AnimatedQuantitySelector;