import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Easing, Image, StatusBar, Text, TouchableOpacity, View, useColorScheme } from "react-native";

export default function LoadingScreen() {
    const [showButtons, setShowButtons] = useState(false);

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const backgroundColor = isDarkMode ? "#00142e" : "#ffffff";
    const textColor = isDarkMode ? "#ffffff" : "#004aa9";
    const buttonBg = isDarkMode ? "#1E40AF" : "#004aa9";
    const borderColor = isDarkMode ? "#60A5FA" : "#004aa9";

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
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

        return () => clearTimeout(timer);
    }, []);

    return (
        <View
            className="flex-1 items-center justify-center relative"
            style={{ backgroundColor }}
        >
            <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
                backgroundColor={backgroundColor}
            />

            <View
                className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-30 -ml-16 -mt-16"
                style={{ backgroundColor: buttonBg }}
            />
            <View
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-30 -mr-16 -mb-16"
                style={{ backgroundColor: buttonBg }}
            />

            <Image
                source={require("../assets/images/goChowLogo.png")}
                className="w-[230px] h-[120px] mb-4"
                resizeMode="contain"
            />

            <Text
                className="text-xl font-bold mt-2"
                style={{ color: textColor }}
            >
                Food Delivery
            </Text>

            {!showButtons ? (
                <ActivityIndicator
                    size="large"
                    color={buttonBg}
                    className="mt-10"
                />
            ) : (
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                    className="flex items-center justify-center w-full absolute bottom-20 left-0 pb-5 gap-3"
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
                        <Text className="text-white text-center font-semibold text-lg">
                            Login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-[85%] py-5 rounded-full"
                        style={{ borderWidth: 1, borderColor }}
                        onPress={() => router.push("/auth/Signup")}
                    >
                        <Text
                            className="text-center font-semibold text-lg"
                            style={{ color: textColor }}
                        >
                            Create New Account
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
}
