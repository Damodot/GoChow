// components/ui/Button.tsx

import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Typography } from '../Typography';

interface ButtonProps {
    title: string;
    onPress: () => void;
    bgColor?: string;
    style?: StyleProp<ViewStyle>;
    loading?: boolean; // Optional: show loader
    ActivityIndicatorComponent?: React.ReactNode; // Optional: custom loader
    disabled?: boolean; // Optional: explicit disabled
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    bgColor = "#004aa9",
    style,
    loading = false,
    ActivityIndicatorComponent,
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                styles.button,
                { backgroundColor: bgColor },
                style,
                (loading || disabled) && styles.disabledButton, // Optional: dim when disabled/loading
            ]}
            onPress={onPress}
            disabled={loading || disabled}
        >
            {loading ? (
                <View style={styles.loaderContainer}>
                    {ActivityIndicatorComponent || <ActivityIndicator color="white" size="small" />}
                </View>
            ) : (
                <Typography variant="button" className="text-white text-center">
                    {title}
                </Typography>
            )}
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 20,
        borderRadius: 9999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 8,
    },
    disabledButton: {
        opacity: 0.85,
    },
    loaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});