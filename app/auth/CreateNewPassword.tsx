import CustomAlert from "@/components/CustomAlert";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    Pressable,
    SafeAreaView,
    StatusBar,
    TextInput,
    useColorScheme,
    View
} from "react-native";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";
import { useFonts } from "../../hooks/useFonts";

export default function CreateNewPassword() {
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

    const [newPassword, setNewPassword] = useState("");
    const [confNewPassword, setConfNewPassword] = useState("");
    const [remember, setRemember] = useState(true);


    const [toastVisible, setToastVisible] = useState(false);
    const [toastKind, setToastKind] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [toastMsg, setToastMsg] = useState('');

    const showToast = (k: typeof toastKind, m: string) => {
        setToastKind(k);
        setToastMsg(m);
        setToastVisible(true);
    };


    const handleSignIn = () => {
        if (newPassword !== confNewPassword) {
            showToast('error', 'All fields are mandatory')
            return
        }
        showToast('success', 'User signed in successfully')
        setTimeout(() => {
            // router.push()
        }, 2000);
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
                    transform: [{ translateY: slideAnim }],
                }}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 }}
            >
                {/* Header */}
                <View className="items-center mt-10 mb-6">
                    <Typography variant="h1" style={{ color: text }} className="text-center">
                        Create new Password
                    </Typography>
                    <Typography variant="body" style={{ color: subText }} className="mt-5 text-sm text-center">
                        You can now create a new password
                    </Typography>
                </View>

                <View className="my-4">
                    <Typography variant="bodyBold" style={{ color: text }} className="mb-2 ms-3 text-md">
                        New Password
                    </Typography>
                    <TextInput
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Enter new password"
                        placeholderTextColor={subText}
                        secureTextEntry
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

                {/* Password */}
                <View className="mb-3">
                    <Typography variant="bodyBold" style={{ color: text }} className="mb-2 ms-3 text-md">
                        Confirm New Password
                    </Typography>
                    <TextInput
                        value={confNewPassword}
                        onChangeText={setConfNewPassword}
                        placeholder="Confirm new password"
                        placeholderTextColor={subText}
                        secureTextEntry
                        className="h-12 rounded-2xl px-4"
                        style={[
                            {
                                backgroundColor: fieldBg,
                                height: 55,
                                color: text,
                            },
                            fontsLoaded && { fontFamily: 'Urbanist' }
                        ]}
                        onSubmitEditing={handleSignIn}
                    />
                </View>

                <View className="flex-row items-center justify-between mt-6 mb-12">
                    <Pressable
                        onPress={() => setRemember((r) => !r)}
                        className="flex-row items-center"
                    >
                        <View
                            className="w-5 h-5 rounded-full mr-2 items-center justify-center"
                            style={{
                                borderWidth: 1.5,
                                borderColor: outline,
                                backgroundColor: remember ? outline : "transparent",
                            }}
                        >
                            {remember ? (
                                <View className="w-2.5 h-2.5 rounded-full bg-white" />
                            ) : null}
                        </View>
                        <Typography variant="body" style={{ color: text }}>
                            Remember Me
                        </Typography>
                    </Pressable>
                </View>

                {/* Sign in */}
                <View>
                    <Button
                        title="Next"
                        onPress={handleSignIn}
                    />
                </View>
            </Animated.ScrollView>
            <CustomAlert
                visible={toastVisible}
                type={toastKind}
                message={toastMsg}
                onClose={() => {
                    setToastVisible(false);
                }}
            />
        </SafeAreaView >
    );
}