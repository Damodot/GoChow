import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    Image,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    View,
} from "react-native";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";
import { useTheme } from "../../hooks/useTheme";

export default function LoadedScreen() {
    const [showButtons, setShowButtons] = useState(false);
    const colors = useTheme();
    const bgImage = require("../../assets/images/LoadedBg.png");

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
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
    }, []);

    const { width, height } = Dimensions.get("window");

    // 🔹 Define max width for buttons (ideal for tablets)
    const { width: screenWidth } = Dimensions.get("window");
    const MAX_BUTTON_WIDTH = screenWidth > 768 ? 500 : 450;

    return (
        <View className="flex-1" style={{ backgroundColor: colors.bg }}>
            <StatusBar
                barStyle={colors.text === "#ffffff" ? "light-content" : "dark-content"}
                backgroundColor="transparent"
                translucent
            />

            {/* Background Image */}
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
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center px-6">
                {/* Logo */}
                <Image
                    source={require("../../assets/images/goChowLogo.png")}
                    className="w-[230px] h-[120px]"
                    resizeMode="contain"
                />
                <Typography variant="h3" style={{ color: colors.text }} className="mt-2 mb-6">
                    Food Delivery
                </Typography>

                {/* Animated Buttons Container */}
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                        width: "100%",
                        maxWidth: MAX_BUTTON_WIDTH,
                        alignSelf: "center",
                    }}
                    className="items-center w-full absolute bottom-20"
                >
                    {/* Login Button */}
                    <Button
                        title="Login"
                        onPress={() => router.push("/auth/Login")}
                        style={{
                            width: "100%",
                            marginBottom: 15,
                            backgroundColor: colors.btnBg,
                            borderRadius: 999,
                        }}
                    />

                    {/* Sign Up Button (Outline) */}
                    <TouchableOpacity
                        className="w-full py-5 rounded-full"
                        style={{
                            borderWidth: 1,
                            borderColor: colors.outline,
                            backgroundColor: colors.bg,
                            borderRadius: 999,
                        }}
                        onPress={() => router.push("/auth/Signup")}
                    >
                        <Typography variant="button" style={{ color: colors.text }} className="text-center">
                            Create New Account
                        </Typography>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
}