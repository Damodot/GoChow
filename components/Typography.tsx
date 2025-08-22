// components/Typography.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';
import { useFonts } from '../hooks/useFonts';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'caption' | 'button';
type FontFamily = 'Urbanist' | 'Urbanist-Bold' | 'Urbanist-SemiBold' | 'Urbanist-Medium' | 'Urbanist-Light';

interface CustomTextProps extends TextProps {
    variant?: Variant;
    fontFamily?: FontFamily;
}

export const Typography = ({
    children,
    variant = 'body',
    fontFamily,
    style,
    ...props
}: CustomTextProps) => {
    const { fontsLoaded } = useFonts();

    // Define style variants with proper typing
    const variantStyles: Record<Variant, object> = {
        h1: { fontSize: 28, fontWeight: '700' as const },
        h2: { fontSize: 24, fontWeight: '700' as const },
        h3: { fontSize: 20, fontWeight: '600' as const },
        body: { fontSize: 16, fontWeight: '400' as const },
        bodyBold: { fontSize: 16, fontWeight: '700' as const },
        caption: { fontSize: 14, fontWeight: '400' as const },
        button: { fontSize: 16, fontWeight: '600' as const },
    };

    // Font family styles
    const fontStyles = fontsLoaded ? {
        fontFamily: fontFamily ||
            (variant === 'bodyBold' || variant === 'button' || variant === 'h1' || variant === 'h2' || variant === 'h3'
                ? 'Urbanist-Bold'
                : 'Urbanist')
    } : {};

    return (
        <Text
            style={[
                variantStyles[variant],
                fontStyles,
                style
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};