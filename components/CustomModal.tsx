import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useFonts } from "../hooks/useFonts";
import { Typography } from "./Typography";

const { width } = Dimensions.get("window");

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    message: string;
    buttonText?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
    visible,
    onClose,
    title,
    message,
    buttonText = "Got It",
}) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const brand = "#004aa9";
    const { fontsLoaded } = useFonts();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        if (!visible) return;

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
    }, [visible]);

    const btnBg = isDark ? "#1E40AF" : brand;
    const modalBg = isDark ? "#1f2937" : "white";
    const textColor = isDark ? "#f9fafb" : "#111827";
    const subTextColor = isDark ? "#9ca3af" : "#6B7280";

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.modalBox,
                        {
                            backgroundColor: modalBg,
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                    className="h-[318px] relative"
                >
                    {/* Error Icon */}
                    <Ionicons name="alert-circle" size={50} color="#ff3d00" />

                    {/* Title */}
                    <Typography
                        variant="h1"
                        style={{ color: textColor }}
                        className="py-5 text-center"
                    >
                        {title}
                    </Typography>

                    {/* Message */}
                    <Typography
                        variant="body"
                        style={{ color: subTextColor, textAlign: 'center', marginBottom: 20 }}
                        className="px-4 py-5"
                    >
                        {message}
                    </Typography>

                    {/* Action Button */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        className="w-full py-5 rounded-full absolute bottom-12"
                        style={{
                            backgroundColor: btnBg,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 6,
                            elevation: 8,
                        }}
                        onPress={onClose}
                    >
                        <Typography variant="button" className="text-white text-center">
                            {buttonText}
                        </Typography>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default CustomModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalBox: {
        width: width,
        padding: 24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        alignItems: "center",
    },
});