// components/ui/CustomCheckbox.tsx

import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Typography } from '../Typography'; // Adjust path if needed

type CustomCheckboxProps = {
    value: boolean;
    onValueChange: (value: boolean) => void;
    label: string;
    disabled?: boolean;
    borderColor: string;
    bgColor: string;
};

export default function CustomCheckbox({ value, onValueChange, label, disabled = false, borderColor, bgColor }: CustomCheckboxProps) {
    const colors = useTheme();

    return (
        <Pressable
            onPress={() => !disabled && onValueChange(!value)}
            className="flex-row items-center"
            disabled={disabled}
        >
            {/* Outer Circle */}
            <View
                className="w-5 h-5 rounded-full mr-2 items-center justify-center"
                style={{
                    borderWidth: 1.5,
                    borderColor: borderColor,
                    backgroundColor: value ? bgColor : 'transparent',
                }}
            >
                {/* Inner Dot (only if checked) */}
                {value ? <View className="w-2.5 h-2.5 rounded-full bg-white" /> : null}
            </View>

            {/* Label */}
            <Typography variant="body" style={{ color: disabled ? colors.subText : colors.text }}>
                {label}
            </Typography>
        </Pressable>
    );
}