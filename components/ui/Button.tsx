import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Typography } from "../../components/Typography";

interface ButtonProps {
    title: string;
    onPress: () => void;
    bgColor?: string;
    style?: ViewStyle; // allow custom styling overrides
}

const Button: React.FC<ButtonProps> = ({ title, onPress, bgColor = "#004aa9", style }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                styles.button,
                { backgroundColor: bgColor },
                style, // merge custom styles
            ]}
            onPress={onPress}
        >
            <Typography variant="button" className="text-white text-center">
                {title}
            </Typography>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        width: "100%",
        paddingVertical: 20,
        borderRadius: 9999, // makes it fully rounded
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 8,
    },
});
