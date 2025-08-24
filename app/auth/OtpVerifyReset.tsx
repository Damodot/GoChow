import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    SafeAreaView,
    StatusBar,
    TextInput,
    View
} from "react-native";
import CustomModal from "../../components/CustomModal";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";
import { useFonts } from "../../hooks/useFonts";


export default function OTPVerifyReset() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const { fontsLoaded } = useFonts();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const inputs = useRef<Array<TextInput | null>>([]);
    const [errorVisible, setErrorVisible] = useState(false);


    // Animation on mount
    useEffect(() => {
        if (!fontsLoaded) return;

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
        if (code.length !== 4 || !code.length) {
            setErrorVisible(true)
            return
        }
        router.push('/auth/CreateNewPassword')
    };

    const brand = "#004aa9";
    const bg = isDark ? "#0b0b0f" : "#ffffff";
    const text = isDark ? "#ffffff" : "#111827";
    const subText = isDark ? "#cbd5e1" : "#6b7280";
    const inputBg = isDark ? "#1f2937" : "#f3f4f6";
    const inputBorder = isDark ? "#374151" : "#e5e7eb";
    const btnBg = isDark ? "#1E40AF" : brand;
    const outline = isDark ? "#60A5FA" : brand;


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
                    transform: [{ translateY: slideAnim }],
                }}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 }}
            >
                <View className="items-center mt-10 mb-6">
                    {/* Title */}
                    <Typography variant="h1" style={{ color: text }} className="text-center mb-2">
                        OTP Code Verification
                    </Typography>
                    <Typography variant="body" style={{ color: subText }} className="text-center mb-8">
                        We have sent an OTP code to your email{"\n"}
                        <Typography variant="bodyBold" style={{ color: text }}>
                            Stella123@gmail.com
                        </Typography>
                    </Typography>

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
                                className="w-16 h-16 text-center rounded-2xl text-3xl"
                                style={[
                                    {
                                        backgroundColor: inputBg,
                                        color: text,
                                        borderColor: inputBorder,
                                        borderWidth: isDark ? 1 : 0
                                    },
                                    fontsLoaded && { fontFamily: 'Urbanist-SemiBold' }
                                ]}
                            />
                        ))}
                    </View>

                    {/* Timer */}
                    <Typography variant="body" style={{ color: subText }} className="mb-6">
                        You can resend code in{" "}
                        <Typography variant="bodyBold" style={{ color: outline }}>
                            {timer}s
                        </Typography>
                    </Typography>

                    {/* Confirm Button */}
                    <Button
                        title="Confirm"
                        onPress={handleConfirm}
                    />

                    {/* Resend Link */}
                    <Typography variant="body" style={{ color: subText }} className="text-center mt-6">
                        Didn't receive an email?{" "}
                        <Typography variant="bodyBold" className="text-red-600">
                            Resend Code
                        </Typography>
                    </Typography>
                </View>
            </Animated.ScrollView>
            <CustomModal
                visible={errorVisible}
                onClose={() => setErrorVisible(false)}
                title="Incorrect code entered"
                message="Please check the code and try again"
            />
        </SafeAreaView>
    );
}