import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    StatusBar,
    View,
} from "react-native";
import { Typography } from "../components/Typography";
import { useTheme } from "../hooks/useTheme";

export default function LoadingScreen() {
    const bgImage = require("../assets/images/LoadingBg.png")

    const colors = useTheme();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        const timer = setTimeout(async () => {
            const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
            // router.replace(hasSeenOnboarding ? '/FirstMainPage' : '/Onboarding/OnboardingScreen')
            router.replace('/Onboarding/OnboardingScreen');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const { width, height } = Dimensions.get("window");

    return (
        <View className="flex-1" style={{ backgroundColor: colors.bg }}>
            <StatusBar
                barStyle={colors.text === "#ffffff" ? "light-content" : "dark-content"}
                backgroundColor="transparent"
                translucent
            />

            {/* Image layer on top of the solid background */}
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width,
                    height,
                }}
            >
                <ImageBackground
                    source={bgImage}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                />
            </View>

            {/* Content Layer */}
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
                {/* Logo */}
                <Image
                    source={require("../assets/images/goChowLogo.png")}
                    className="w-[230px] h-[120px]"
                    resizeMode="contain"
                />
                <Typography variant="h3" style={{ color: colors.text }} className="mt-2 mb-6">
                    Food Delivery
                </Typography>

                <ActivityIndicator size="large" color={colors.btnBg} />
            </View>
        </View>
    );
}