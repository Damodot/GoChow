import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    SafeAreaView,
    StatusBar,
    TextInput,
    useColorScheme,
    View
} from "react-native";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";
import { useFonts } from "../../hooks/useFonts";

export default function LoginScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const { fontsLoaded } = useFonts();

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

    // theme tokens (same vibe as your splash screen)
    const brand = "#004aa9";
    const bg = isDark ? "#0b0b0f" : "#ffffff";
    const text = isDark ? "#ffffff" : "#111827";
    const subText = isDark ? "#cbd5e1" : "#6b7280";
    const fieldBg = isDark ? "#1f2937" : "#f3f4f6";
    const fieldBorder = isDark ? "#374151" : "#e5e7eb";
    const divider = isDark ? "#334155" : "#e5e7eb";
    const btnBg = isDark ? "#1E40AF" : brand;
    const outline = isDark ? "#60A5FA" : brand;
    const appleLogo = isDark ? "#f3f4f6" : "5b5b5b";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);

    const handleSignIn = () => {
        alert(`Signing in as ${email || "guest"}…`);
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
            <StatusBar
                barStyle={isDark ? "light-content" : "dark-content"}
                backgroundColor={bg}
            />
            <Animated.ScrollView
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 }}
            >
                {/* Header */}
                <View className="items-center mt-10 mb-6">
                    <Typography variant="h1" style={{ color: text }} className="text-center">
                        Reset Password
                    </Typography>
                    <Typography variant="body" style={{ color: subText }} className="mt-5 text-sm text-center">
                        Please enter your email to receive the link to create a new password.
                    </Typography>
                </View>

                {/* Email */}
                <View className="mt-4 mb-8">
                    <Typography variant="bodyBold" style={{ color: text }} className="mb-2 ms-3 text-md">
                        Email
                    </Typography>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email"
                        placeholderTextColor={subText}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="h-12 rounded-2xl px-4"
                        style={[
                            {
                                backgroundColor: fieldBg,
                                height: 55,
                                color: text,
                            },
                            fontsLoaded && { fontFamily: 'Urbanist' }
                        ]}
                    />
                </View>

                <Button
                    title="Send"
                    onPress={() => router.push("/auth/OtpVerifyReset")}
                />
            </Animated.ScrollView>
        </SafeAreaView>
    );
}