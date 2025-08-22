import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

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

  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [termsAgreement, setTermsAgreement] = useState(true);

  const handleSignIn = () => {
    alert(`Signing in as ${email || "guest"}…`);
  };

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
          <Text
            className="text-4xl font-extrabold"
            style={{ color: text }}
          >
            Create New Account
          </Text>
          <Text
            className="mt-3 text-sm"
            style={{ color: subText, textAlign: "center" }}
          >
            Create a new account to explore GO CHOWW
          </Text>
        </View>

        <View className="my-3">
          <Text className="mb-2 ms-3 text-md font-semibold" style={{ color: text }}>
            Name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
            placeholderTextColor={subText}
            keyboardType="default"
            autoCapitalize="none"
            className="h-12 rounded-2xl px-4"
            style={{
              backgroundColor: fieldBg,
              height: 55,
              color: text,
            }}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-2 ms-3 text-md font-semibold" style={{ color: text }}>
            Phone Number
          </Text>
          <TextInput
            value={phoneNum}
            onChangeText={setPhoneNum}
            placeholder="(+234)"
            placeholderTextColor={subText}
            keyboardType="phone-pad"
            className="h-12 rounded-2xl px-4"
            style={{
              backgroundColor: fieldBg,
              height: 55,
              color: text,
            }}
            onSubmitEditing={handleSignIn}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-2 ms-3 text-md font-semibold" style={{ color: text }}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor={subText}
            keyboardType="email-address"
            autoCapitalize="none"
            className="h-12 rounded-2xl px-4"
            style={{
              backgroundColor: fieldBg,
              height: 55,
              color: text,
            }}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-2 ms-3 text-md font-semibold" style={{ color: text }}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            placeholderTextColor={subText}
            keyboardType="email-address"
            secureTextEntry
            className="h-12 rounded-2xl px-4"
            style={{
              backgroundColor: fieldBg,
              height: 55,
              color: text,
            }}
          />
        </View>

        {/* Confirm New Password */}
        <View className="mb-3">
          <Text className="mb-2 ms-3 text-md font-semibold" style={{ color: text }}>
            Confirm New Password
          </Text>
          <TextInput
            value={confPassword}
            onChangeText={setConfPassword}
            placeholder="Enter Password"
            placeholderTextColor={subText}
            secureTextEntry
            className="h-12 rounded-2xl px-4"
            style={{
              backgroundColor: fieldBg,
              height: 55,
              color: text,
            }}
            onSubmitEditing={handleSignIn}
          />
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
            <Text style={{ color: text }}>I agree to the</Text>
          </Pressable>

          <TouchableOpacity onPress={() => alert("Forgotten Password")}>
            <Text className="font-semibold" style={{ color: outline }}>
              Terms of Service and Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign in */}
        <View>
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
            onPress={handleSignIn}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center mt-3 mb-6">
          <View style={{ flex: 1, height: 1, backgroundColor: divider }} />
          <Text className="mx-3 text-xs" style={{ color: subText }}>
            Or Continue with
          </Text>
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
        <View className="items-center mb-8">
          <Text style={{ color: subText }}>
            Already have an account?{" "}
            <Text
              onPress={() => router.push("/auth/Login")}
              className="font-semibold text-red-600"
            >
              Sign in
            </Text>
          </Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView >
  );
}
