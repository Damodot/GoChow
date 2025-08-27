import CustomAlert from "@/components/CustomAlert";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";
import { useFonts } from "../../hooks/useFonts";

export default function Signup() {
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
  const iconColor = isDark ? "#9ca3af" : "#6b7280";

  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [termsAgreement, setTermsAgreement] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastKind, setToastKind] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (k: typeof toastKind, m: string) => {
    setToastKind(k);
    setToastMsg(m);
    setToastVisible(true);
  };

  const handleSignIn = () => {
    if (!name || !phoneNum || !email || !password) {
      showToast('error', 'All fields are mandatory')
      return
    }
    if (password !== confPassword) {
      showToast('error', 'Passwords do not match')
      return
    }
    showToast('success', 'User created successfully')
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
            Create New Account
          </Typography>
          <Typography variant="body" style={{ color: subText }} className="mt-3 text-sm text-center">
            Create a new account to explore GO CHOWW
          </Typography>
        </View>

        <View className="my-3">
          <Typography variant="bodyBold" style={{ color: text }} className="mb-2 ms-3 text-md">
            Name
          </Typography>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
            placeholderTextColor={subText}
            keyboardType="default"
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

        <View className="mb-3">
          <Typography variant="bodyBold" style={{ color: text }} className="mb-2 ms-3 text-md">
            Phone Number
          </Typography>
          <TextInput
            value={phoneNum}
            onChangeText={setPhoneNum}
            placeholder="(+234)"
            placeholderTextColor={subText}
            keyboardType="phone-pad"
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

        <View className="mb-3">
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

        <View className="mb-3">
          <Typography variant="bodyBold" style={{ color: text }} className="mb-2 ms-3 text-md">
            Password
          </Typography>
          <View className="flex-row items-center">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
              placeholderTextColor={subText}
              secureTextEntry={!showPassword}
              className="flex-1 h-12 rounded-2xl px-4"
              style={[
                {
                  backgroundColor: fieldBg,
                  height: 55,
                  color: text,
                },
                fontsLoaded && { fontFamily: 'Urbanist' }
              ]}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4"
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={iconColor}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm New Password */}
        <View className="mb-3">
          <Typography variant="bodyBold" style={{ color: text }} className="mb-2 ms-3 text-md">
            Confirm New Password
          </Typography>
          <View className="flex-row items-center">
            <TextInput
              value={confPassword}
              onChangeText={setConfPassword}
              placeholder="Enter Password"
              placeholderTextColor={subText}
              secureTextEntry={!showConfPassword}
              className="flex-1 h-12 rounded-2xl px-4"
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
            <TouchableOpacity
              onPress={() => setShowConfPassword(!showConfPassword)}
              className="absolute right-4"
            >
              <Ionicons
                name={showConfPassword ? "eye-off" : "eye"}
                size={20}
                color={iconColor}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center mt-3 mb-6">
          <Pressable
            onPress={() => setTermsAgreement((r) => !r)}
            className="flex-row items-center"
          >
            <View
              className="w-5 h-5 rounded-full mr-2 items-center justify-center"
              style={{
                borderWidth: 1.5,
                borderColor: outline,
                backgroundColor: termsAgreement ? outline : "transparent",
              }}
            >
              {termsAgreement ? (
                <View className="w-2.5 h-2.5 rounded-full bg-white" />
              ) : null}
            </View>
            <Typography variant="body" style={{ color: text }}>
              I agree to the
            </Typography>
          </Pressable>

          <TouchableOpacity onPress={() => alert("Terms of Service and Privacy Policy Pressed")}>
            <Typography variant="bodyBold" style={{ color: outline }}>
              Terms of Service and Privacy Policy
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Sign in */}
        <View>
          <Button
            title="Sign Up"
            onPress={handleSignIn}
          />
        </View>

        {/* Divider */}
        <View className="flex-row items-center mt-6 mb-6">
          <View style={{ flex: 1, height: 1, backgroundColor: divider }} />
          <Typography variant="caption" style={{ color: subText }} className="mx-3 text-xs">
            Or Continue with
          </Typography>
          <View style={{ flex: 1, height: 1, backgroundColor: divider }} />
        </View>

        {/* Social buttons */}
        <View
          className="flex-row items-center justify-center gap-10 mb-8">
          <TouchableOpacity
            className="w-14 h-14 rounded-2xl items-center justify-center"
            style={{
              backgroundColor: isDark ? "#111827" : "#ffffff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 5,
              borderWidth: isDark ? 1 : 0,
              borderColor: fieldBorder,
            }}
            onPress={() => alert("Continue with Google")}
          >
            <AntDesign name="google" size={22} color={outline} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-14 h-14 rounded-2xl items-center justify-center"
            style={{
              backgroundColor: isDark ? "#111827" : "#ffffff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 5,
              borderWidth: isDark ? 1 : 0,
              borderColor: fieldBorder,
            }}
            onPress={() => alert("Continue with Apple")}
          >
            <FontAwesome name="apple" size={24} color={appleLogo} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-14 h-14 rounded-2xl items-center justify-center"
            style={{
              backgroundColor: isDark ? "#111827" : "#ffffff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 5,
              borderWidth: isDark ? 1 : 0,
              borderColor: fieldBorder,
            }}
            onPress={() => alert("Continue with Facebook")}
          >
            <FontAwesome name="facebook" size={22} color={outline} />
          </TouchableOpacity>
        </View>

        {/* Sign up link */}
        <View className="flex items-center justify-center mb-8">
          <View className="flex-row items-center">
            <Typography variant="body" style={{ color: subText }} className="text-center">
              Already have an account? 
            </Typography>
            <TouchableOpacity onPress={() => router.replace("/auth/Login")}>
              <Typography variant="bodyBold" className="text-red-600 text-center">
                {' '}Sign in
              </Typography>
            </TouchableOpacity>
          </View>
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