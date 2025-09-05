import { Typography } from "@/components/Typography";
import Button from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, Image, StatusBar, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export default function SuccessScreen() {
    const { width: screenWidth } = Dimensions.get("window");
    const MAX_BUTTON_WIDTH = screenWidth > 768 ? 500 : 450;
    const colors = useTheme();

    // Shared values
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);

    // Run animations
    useEffect(() => {
        // Fade + Slide animation
        opacity.value = withTiming(1, { duration: 600 });
        translateY.value = withTiming(0, { duration: 600 });

        // Bounce animation
        scale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 600 }),
                withTiming(0.95, { duration: 600 })
            ),
            -1,
            true
        );
    }, []);

    // Animated styles
    const containerStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    const imageStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <View
            className="flex-1 items-center justify-center px-6"
            style={{
                flex: 1,
                backgroundColor: colors.bg,
                width: '100%',
                maxWidth: MAX_BUTTON_WIDTH,
                alignSelf: 'center',
            }}
        >
            <StatusBar
                barStyle={colors.text === "#ffffff" ? "light-content" : "dark-content"}
                backgroundColor={colors.bg}
            />

            {/* Animated wrapper only for content */}
            <Animated.View style={containerStyle} className="items-center w-full">
                {/* Animated Image */}
                <Animated.View style={imageStyle}>
                    <Image
                        source={require("@/assets/images/successfulCheck.png")}
                        style={{ width: 240, height: 240, resizeMode: "contain" }}
                    />
                </Animated.View>

                <Typography
                    variant="h1"
                    style={{ color: colors.text }}
                    className="text-center text-5xl pt-4"
                >
                    Successful
                </Typography>

                <Typography
                    variant="body"
                    style={{ color: colors.subText }}
                    className="mt-5 text-sm text-center"
                >
                    Your password has been changed successfully
                </Typography>

                {/* Button */}
                <View className="mt-6 w-full">
                    <Button
                        title="Done"
                        onPress={() => router.replace("/auth/Login")}
                        style={{ backgroundColor: colors.btnBg }}
                    />
                </View>
            </Animated.View>
        </View>
    );
}
