// components/ui/QuantitySelector.tsx

import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '../Typography';

type QuantitySelectorProps = {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    minQuantity?: number; // Optional: default is 1
};

const QuantitySelector = ({
    quantity,
    onQuantityChange,
    minQuantity = 1
}: QuantitySelectorProps) => {
    const colors = useTheme();

    const handleDecrease = () => {
        if (quantity > minQuantity) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        onQuantityChange(quantity + 1);
    };

    return (
        <View className="flex-row items-center space-x-3">
            {/* Decrease Button */}
            <TouchableOpacity
                className="w-8 h-8 rounded-xl items-center justify-center"
                style={{ backgroundColor: colors.fieldBg }}
                onPress={handleDecrease}
            >
                <Typography variant="body" style={{ color: colors.text }} className="font-bold">
                    -
                </Typography>
            </TouchableOpacity>

            {/* Quantity Display */}
            <Typography
                variant="bodyBold"
                className="px-3"
                style={{ color: colors.text }}
            >
                {quantity}
            </Typography>

            {/* Increase Button */}
            <TouchableOpacity
                className="w-8 h-8 rounded-xl items-center justify-center"
                style={{ backgroundColor: colors.brand }}
                onPress={handleIncrease}
            >
                <Typography variant="body" className="font-bold text-white">
                    +
                </Typography>
            </TouchableOpacity>
        </View>
    );
};

export default QuantitySelector;