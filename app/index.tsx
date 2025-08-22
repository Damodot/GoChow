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
                <Typography variant="h2" style={{ color: textColor }} className="mt-2 mb-6">
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
                        <TouchableOpacity
                            className="w-[85%] py-5 rounded-full mb-4"
                            style={{
                                backgroundColor: buttonBg,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.25,
                                shadowRadius: 6,
                                elevation: 8,
                            }}
                            onPress={() => router.push("/auth/Login")}
                        >
                            <Typography variant="button" className="text-white text-center">
                                Login
                            </Typography>
                        </TouchableOpacity>

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