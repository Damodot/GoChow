import CustomAlert from "@/components/CustomAlert";
import Loader from "@/components/ui/Loader";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
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
    View
} from "react-native";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";
import CustomCheckbox from "../../components/ui/CustomCheckbox";
import { useTheme } from "../../hooks/useTheme";

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
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [toastVisible, setToastVisible] = useState(false);
    const [toastKind, setToastKind] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [toastMsg, setToastMsg] = useState('');

    const showToast = (k: typeof toastKind, m: string) => {
        setToastKind(k);
        setToastMsg(m);
        setToastVisible(true);
    };

    const handleSignIn = () => {
        // ✅ Validation
        if (!email.trim()) {
            showToast('error', 'Email is required');
            return;
        }
        if (!password) {
            showToast('error', 'Password is required');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            showToast('success', 'Logged in successfully');
        }, 1500);

        setTimeout(() => {
            setLoading(false);
            router.replace('/dashboard');
        }, 4000); 
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
            <StatusBar
                barStyle={colors.text === "#ffffff" ? "light-content" : "dark-content"}
                backgroundColor={colors.bg}
            />

            {/* Responsive Wrapper for Content */}
            <View
                style={{
                    width: '100%',
                    maxWidth: MAX_BUTTON_WIDTH,
                    alignSelf: 'center',
                }}
            >
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
                        <Typography variant="h1" style={{ color: colors.text }} className="text-center">
                            Login
                        </Typography>
                        <Typography variant="body" style={{ color: colors.subText }} className="mt-5 text-sm text-center">
                            Fill in the following details to sign in
                        </Typography>
                    </View>

                    {/* Email */}
                    <View className="my-4">
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
                            editable={!loading}
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

                    {/* Password */}
                    <View className="mb-3">
                        <Typography variant="bodyBold" style={{ color: colors.text }} className="mb-2 ms-3 text-md">
                            Password
                        </Typography>
                        <View className="flex-row items-center">
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter Password"
                                placeholderTextColor={colors.subText}
                                secureTextEntry={!showPassword}
                                editable={!loading}
                                className="flex-1 h-12 rounded-2xl px-4"
                                style={[
                                    {
                                        backgroundColor: colors.fieldBg,
                                        height: 55,
                                        color: colors.text,
                                    }
                                ]}
                                onSubmitEditing={handleSignIn}
                            />
                            <TouchableOpacity
                                onPress={() => !loading && setShowPassword(!showPassword)}
                                className="absolute right-4"
                                disabled={loading}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={20}
                                    color={loading ? colors.subText + '80' : colors.subText}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between mt-6 mb-12">
                        <CustomCheckbox
                            bgColor={colors.brand}
                            borderColor={colors.brand}
                            value={remember}
                            onValueChange={(v) => !loading && setRemember(v)}
                            label="Remember Me"
                            disabled={loading}
                        />

                        <TouchableOpacity
                            onPress={() => !loading && router.push("/auth/ResetPassword")}
                            disabled={loading}
                        >
                            <Typography variant="bodyBold" style={{ color: loading ? colors.subText + '80' : colors.outline }}>
                                Forgotten Password?
                            </Typography>
                        </TouchableOpacity>
                    </View>

                    {/* Sign in */}
                    <View>
                        <Button
                            title={loading ? "" : "Sign in"}
                            onPress={handleSignIn}
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
                    </View>

                    {/* Divider */}
                    <View className="flex-row items-center mt-6 mb-12">
                        <View style={{ flex: 1, height: 1, backgroundColor: colors.divider }} />
                        <Typography variant="caption" style={{ color: colors.subText }} className="mx-3 text-xs">
                            Or Continue with
                        </Typography>
                        <View style={{ flex: 1, height: 1, backgroundColor: colors.divider }} />
                    </View>

                    {/* Social buttons */}
                    <View className="flex-row items-center justify-center gap-10 mb-8">
                        <TouchableOpacity
                            className="w-14 h-14 rounded-2xl items-center justify-center"
                            style={{
                                backgroundColor: colors.bg,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.15,
                                shadowRadius: 6,
                                elevation: 5,
                                borderWidth: 1,
                                borderColor: colors.fieldBorder,
                            }}
                            onPress={() => !loading && alert("Continue with Google")}
                            disabled={loading}
                        >
                            <AntDesign name="google" size={22} color={loading ? colors.subText + '80' : colors.outline} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="w-14 h-14 rounded-2xl items-center justify-center"
                            style={{
                                backgroundColor: colors.bg,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.15,
                                shadowRadius: 6,
                                elevation: 5,
                                borderWidth: 1,
                                borderColor: colors.fieldBorder,
                            }}
                            onPress={() => !loading && alert("Continue with Apple")}
                            disabled={loading}
                        >
                            <FontAwesome name="apple" size={24} color={loading ? "#ccc" : (colors.text === "#ffffff" ? "#f3f4f6" : "#5b5b5b")} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="w-14 h-14 rounded-2xl items-center justify-center"
                            style={{
                                backgroundColor: colors.bg,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.15,
                                shadowRadius: 6,
                                elevation: 5,
                                borderWidth: 1,
                                borderColor: colors.fieldBorder,
                            }}
                            onPress={() => !loading && alert("Continue with Facebook")}
                            disabled={loading}
                        >
                            <FontAwesome name="facebook" size={22} color={loading ? colors.subText + '80' : colors.outline} />
                        </TouchableOpacity>
                    </View>

                    {/* Sign up link */}
                    <View className="flex items-center justify-center mb-8">
                        <View className="flex-row items-center">
                            <Typography variant="body" style={{ color: colors.subText }} className="text-center">
                                Don't have an account?
                            </Typography>
                            <TouchableOpacity
                                onPress={() => !loading && router.replace("/auth/Signup")}
                                disabled={loading}
                            >
                                <Typography variant="bodyBold" className="text-red-600 text-center">
                                    {' '}Sign up
                                </Typography>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.ScrollView>
            </View>

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