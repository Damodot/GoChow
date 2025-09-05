import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    SafeAreaView,
    StatusBar,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import CustomModal from "../../components/CustomModal";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import { useTheme } from "../../hooks/useTheme";

export default function OTPVerifyReset() {
    const { width: screenWidth } = Dimensions.get("window");
    const MAX_BUTTON_WIDTH = screenWidth > 768 ? 500 : 450;
    const colors = useTheme();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const inputs = useRef<Array<TextInput | null>>([]);
    const [errorVisible, setErrorVisible] = useState(false);
    const [counting, setCounting] = useState(true);
    const [loading, setLoading] = useState(false);

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
        if (timer === 0) {
            setCounting(false);
            return
        };
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

            // Move to next input automatically when typing
            if (text !== "" && index < 3) {
                inputs.current[index + 1]?.focus();
            }

            // Move to previous input automatically when deleting
            if (text === "" && index > 0) {
                inputs.current[index - 1]?.focus();
            }

            // Auto-submit when all 4 digits are filled
            const code = newOtp.join("");
            const correctCode = '1234';
            if (code.length === 4) {
                setLoading(true);
                if (code === correctCode) {
                    setTimeout(() => {
                        setLoading(false);
                        router.replace('/auth/CreateNewPassword');
                    }, 1500);
                } else if (code.length === 4) {
                    setErrorVisible(true);
                }
            }
        }
    };

    const handleConfirm = () => {
        const code = otp.join("");
        const correctCode = '1234';
        if (code.length !== 4 || !code.length || code !== correctCode) {
            setErrorVisible(true);
            return;
        }
        router.push('/auth/CreateNewPassword');
    };

    return (
        <SafeAreaView
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
                    <Typography variant="h1" style={{ color: colors.text }} className="text-center mb-2">
                        OTP Code Verification
                    </Typography>
                    <Typography variant="body" style={{ color: colors.subText }} className="text-center mb-8">
                        We have sent an OTP code to your email{"\n"}
                        <Typography variant="bodyBold" style={{ color: colors.text }}>
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
                                        backgroundColor: colors.fieldBg,
                                        color: colors.text,
                                        borderColor: colors.fieldBorder,
                                        borderWidth: 1
                                    }
                                ]}
                            />
                        ))}
                    </View>

                    {/* Timer */}
                    <Typography variant="body" style={{ color: colors.subText }} className="mb-6">
                        You can resend code in{" "}
                        <Typography variant="bodyBold" style={{ color: colors.outline }}>
                            {timer}s
                        </Typography>
                    </Typography>

                    {/* Confirm Button */}
                    <Button
                        title={loading ? "" : "Confirm"}
                        onPress={handleConfirm}
                        style={{
                            backgroundColor: colors.btnBg,
                            opacity: loading ? 0.8 : 1,
                            marginBottom: 25
                        }}
                        loading={loading}
                        ActivityIndicatorComponent={
                            <Loader />
                        }
                        disabled={loading}
                    />

                    {/* Resend Link */}
                    <View className="flex items-center justify-center">
                        <View className="flex-row items-center">
                            <Typography variant="body" style={{ color: colors.subText }} className="text-center">
                                Didn't receive an email?{" "}
                            </Typography>
                            <TouchableOpacity
                                onPress={() => {
                                    if (!counting) {
                                        setTimer(60);
                                        setCounting(true);
                                    }
                                }}
                                disabled={counting}
                                activeOpacity={counting ? 1 : 0.7}
                            >
                                <Typography
                                    variant="bodyBold"
                                    className={`text-center ${counting
                                        ? 'text-gray-400'
                                        : 'text-red-600'
                                        } ${counting ? 'opacity-60' : 'opacity-100'}`}
                                >
                                    Resend Code
                                </Typography>
                            </TouchableOpacity>
                        </View>
                    </View>
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