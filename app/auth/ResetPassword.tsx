import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    SafeAreaView,
    StatusBar,
    TextInput,
    View,
} from "react-native";
import CustomAlert from "../../components/CustomAlert";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";

export default function LoginScreen() {
    const { width: screenWidth } = Dimensions.get("window");
    const MAX_BUTTON_WIDTH = screenWidth > 768 ? 500 : 450;
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
    const [loading, setLoading] = useState(false);

    const [toastVisible, setToastVisible] = useState(false);
    const [toastKind, setToastKind] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [toastMsg, setToastMsg] = useState('');

    const showToast = (k: typeof toastKind, m: string) => {
        setToastKind(k);
        setToastMsg(m);
        setToastVisible(true);
    };

    const handleReset = () => {
        if (!email) {
            showToast('error', 'Please enter a valid email.');
            return
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.replace('/auth/OtpVerifyReset')
        }, 2000);
    }


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
                    title={loading ? "" : "Send Reset Code"}
                    onPress={handleReset}
                    style={{
                        backgroundColor: colors.btnBg,
                        opacity: loading ? 0.8 : 1
                    }}
                    loading={loading}
                    ActivityIndicatorComponent={
                        <Loader />
                    }
                    disabled={loading}
                />
            </Animated.ScrollView>
            <CustomAlert
                visible={toastVisible}
                type={toastKind}
                message={toastMsg}
                onClose={() => {
                    setToastVisible(false);
                }}
            />
        </SafeAreaView>
    );
}