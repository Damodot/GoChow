import { useColorScheme } from "nativewind";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function OTPVerifyReset() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const inputs = useRef<Array<TextInput | null>>([]);

    // Animation on mount
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

    // Countdown for resend code
    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (text: string, index: number) => {
        if (/^[0-9]$/.test(text) || text === "") {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);

            // Move to next input automatically
            if (text !== "" && index < 3) {
                inputs.current[index + 1]?.focus();
            }
        }
    };

    const handleConfirm = () => {
        const code = otp.join("");
        if (code.length === 4) {
            alert("OTP Entered: " + code);
        } else {
            alert("Please enter full OTP");
        }
    };

    const brand = "#004aa9";
    const bg = isDark ? "#0b0b0f" : "#ffffff";
    const text = isDark ? "#ffffff" : "#111827";
    const subText = isDark ? "#cbd5e1" : "#6b7280";
    const inputBg = isDark ? "#1f2937" : "#f3f4f6";
    const inputBorder = isDark ? "#374151" : "#e5e7eb";
    const btnBg = isDark ? "#1E40AF" : brand;
    const outline = isDark ? "#60A5FA" : brand;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
            <StatusBar
                barStyle={isDark ? "light-content" : "dark-content"}
                backgroundColor={bg}
            />

            <Animated.ScrollView
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                }}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 }}
            >
                <View className="items-center mt-10 mb-6">
                    {/* Title */}
                    <Text
                        className="text-4xl font-extrabold"
                        style={{ color: text }}
                    >
                        OTP Code Verification
                    </Text>
                    <Text
                        className="text-sm text-center mt-3 mb-8"
                        style={{ color: subText }}
                    >
                        We have sent an OTP code to your email{"\n"}
                        <Text className="font-semibold" style={{ color: text }}>
                            Stella123@gmail.com
                        </Text>
                    </Text>

                    {/* OTP Inputs */}
                    <View className="flex-row justify-between w-[80%] mt-3 mb-6">
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(el) => { inputs.current[index] = el; }}
                                value={digit}
                                onChangeText={(text) => handleChange(text, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                className="w-16 h-16 text-center rounded-2xl text-2xl font-semibold"
                                style={{
                                    backgroundColor: inputBg,
                                    color: text,
                                    borderColor: inputBorder,
                                    borderWidth: isDark ? 1 : 0,
                                }}
                            />
                        ))}
                    </View>

                    {/* Timer */}
                    <Text className="mb-6" style={{ color: subText }}>
                        You can resend code in{" "}
                        <Text className="font-semibold" style={{ color: outline }}>
                            {timer}s
                        </Text>
                    </Text>

                    {/* Confirm Button */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        className="w-full py-5 rounded-full mb-3"
                        style={{
                            backgroundColor: btnBg,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 6,
                            elevation: 8,
                        }}
                        onPress={() => alert('Confirm Pressed')}
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            Confirm
                        </Text>
                    </TouchableOpacity>

                    {/* Resend Link */}
                    <Text style={{ color: subText }}>
                        Didn't receive an email?{" "}
                        <Text
                            className="font-semibold text-red-600"
                        >
                            Click here
                        </Text>
                    </Text>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
}