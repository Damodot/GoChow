import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    SafeAreaView,
    StatusBar,
    TextInput,
    View
} from "react-native";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";

export default function LoginScreen() {
    const colors = useTheme();

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


    const [email, setEmail] = useState("");

    const handleReset = () => {
        if (!email) {
            return
        }
        router.replace('/auth/OtpVerifyReset')
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
            <StatusBar
                barStyle={colors.text === '#ffffff' ? "light-content" : "dark-content"}
                backgroundColor={colors.bg}
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
                    <Typography variant="h1" style={{ color: colors.text }} className="text-center">
                        Reset Password
                    </Typography>
                    <Typography variant="body" style={{ color: colors.subText }} className="mt-5 text-sm text-center">
                        Please enter your email to receive the link to create a new password.
                    </Typography>
                </View>

                {/* Email */}
                <View className="mt-4 mb-8">
                    <Typography variant="bodyBold" style={{ color: colors.text }} className="mb-2 ms-3 text-md">
                        Email
                    </Typography>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email"
                        placeholderTextColor={colors.subText}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="h-12 rounded-2xl px-4"
                        style={[
                            {
                                backgroundColor: colors.fieldBg,
                                height: 55,
                                color: colors.text,
                            }
                        ]}
                    />
                </View>

                <Button
                    title="Send"
                    onPress={handleReset}
                />
            </Animated.ScrollView>
        </SafeAreaView>
    );
}