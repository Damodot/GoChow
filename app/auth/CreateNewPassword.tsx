import CustomAlert from "@/components/CustomAlert";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    SafeAreaView,
    StatusBar,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";
import { useTheme } from "../../hooks/useTheme";

export default function CreateNewPassword() {
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

    const [newPassword, setNewPassword] = useState("");
    const [confNewPassword, setConfNewPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);

    const [toastVisible, setToastVisible] = useState(false);
    const [toastKind, setToastKind] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [toastMsg, setToastMsg] = useState('');

    const showToast = (k: typeof toastKind, m: string) => {
        setToastKind(k);
        setToastMsg(m);
        setToastVisible(true);
    };

    const handleCreatePassword = () => {
        if (!newPassword || !confNewPassword) {
            showToast('error', 'All fields are mandatory');
            return;
        }

        if (newPassword !== confNewPassword) {
            showToast('error', 'Passwords do not match');
            return;
        }

        showToast('success', 'Password updated successfully');
        setTimeout(() => {
            router.replace("/auth/PasswordChangeConfirmed")
        }, 2000);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
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
                {/* Header */}
                <View className="items-center mt-10 mb-6">
                    <Typography variant="h1" style={{ color: colors.text }} className="text-center">
                        Create new Password
                    </Typography>
                    <Typography variant="body" style={{ color: colors.subText }} className="mt-5 text-sm text-center">
                        You can now create a new password
                    </Typography>
                </View>

                <View className="my-4">
                    <Typography variant="bodyBold" style={{ color: colors.text }} className="mb-2 ms-3 text-md">
                        New Password
                    </Typography>
                    <View className="flex-row items-center">
                        <TextInput
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="Enter new password"
                            placeholderTextColor={colors.subText}
                            secureTextEntry={!showNewPassword}
                            autoCapitalize="none"
                            className="flex-1 h-12 rounded-2xl px-4"
                            style={[
                                {
                                    backgroundColor: colors.fieldBg,
                                    height: 55,
                                    color: colors.text,
                                }
                            ]}
                            onSubmitEditing={handleCreatePassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4"
                        >
                            <Ionicons
                                name={showNewPassword ? "eye-off" : "eye"}
                                size={20}
                                color={colors.subText}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Confirm New Password */}
                <View className="mb-3">
                    <Typography variant="bodyBold" style={{ color: colors.text }} className="mb-2 ms-3 text-md">
                        Confirm New Password
                    </Typography>
                    <View className="flex-row items-center">
                        <TextInput
                            value={confNewPassword}
                            onChangeText={setConfNewPassword}
                            placeholder="Confirm new password"
                            placeholderTextColor={colors.subText}
                            secureTextEntry={!showConfPassword}
                            className="flex-1 h-12 rounded-2xl px-4"
                            style={[
                                {
                                    backgroundColor: colors.fieldBg,
                                    height: 55,
                                    color: colors.text,
                                }
                            ]}
                            onSubmitEditing={handleCreatePassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfPassword(!showConfPassword)}
                            className="absolute right-4"
                        >
                            <Ionicons
                                name={showConfPassword ? "eye-off" : "eye"}
                                size={20}
                                color={colors.subText}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mt-4">
                    <Button
                        title="Next"
                        onPress={handleCreatePassword}
                        style={{ backgroundColor: colors.btnBg }}
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
        </SafeAreaView>
    );
}