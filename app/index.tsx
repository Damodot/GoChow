import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Easing,
    Image,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    View,
    useColorScheme
} from "react-native";
import { Typography } from "../components/Typography";
import Button from "../components/ui/Button";
import { useFonts } from "../hooks/useFonts";

export default function LoadingScreen() {
    const [showButtons, setShowButtons] = useState(false);
    const [bgImage, setBgImage] = useState(
        require("../assets/images/LoadingBg.png")
    );

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const { fontsLoaded } = useFonts();

    const backgroundColor = isDarkMode ? "#00142e" : "#ffffff";
    const textColor = isDarkMode ? "#ffffff" : "#004aa9";
    const buttonBg = isDarkMode ? "#1E40AF" : "#004aa9";
    const borderColor = isDarkMode ? "#60A5FA" : "#004aa9";

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        // Switch background after 3s
        const bgTimer = setTimeout(() => {
            setBgImage(require("../assets/images/LoadedBg.png")); // second background
        }, 3000);

        // Show buttons after 3s
        const timer = setTimeout(() => {
            setShowButtons(true);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start();
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(bgTimer);
        };
    }, []);

    const { width, height } = Dimensions.get("window");

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View className="flex-1" style={{ backgroundColor }}>
            <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
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
                <Typography variant="h3" style={{ color: textColor }} className="mt-2 mb-6">
                    Food Delivery
                </Typography>

                {/* Loader or Buttons */}
                {!showButtons ? (
                    <ActivityIndicator size="large" color={buttonBg} />
                ) : (
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        }}
                        className="items-center w-full absolute bottom-20"
                    >
                        <Button
                            title="Login"
                            onPress={() => router.push("/auth/Login")}
                            style={{ width: "85%", marginBottom: 15 }}
                        />

                        <TouchableOpacity
                            className="w-[85%] py-5 rounded-full"
                            style={{
                                borderWidth: 1,
                                borderColor,
                                backgroundColor: backgroundColor,
                            }}
                            onPress={() => router.push("/auth/Signup")}
                        >
                            <Typography variant="button" style={{ color: textColor }} className="text-center">
                                Create New Account
                            </Typography>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
        </View>
    );
}