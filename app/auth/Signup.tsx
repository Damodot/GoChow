import CustomAlert from "@/components/CustomAlert";
import CustomCheckbox from "@/components/ui/CustomCheckbox";
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
  View,
} from "react-native";
import { Typography } from "../../components/Typography";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import { useTheme } from "../../hooks/useTheme";

export default function Signup() {
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    showToast('success', 'User created successfully')
    setTimeout(() => {
      setLoading(false);
      router.replace('/auth/Login')
    }, 2000);
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
        {/* Header */}
        <View className="items-center mt-10 mb-6">
          <Typography variant="h1" style={{ color: colors.text }} className="text-center">
            Create New Account
          </Typography>
          <Typography variant="body" style={{ color: colors.subText }} className="mt-3 text-sm text-center">
            Create a new account to explore GO CHOWW
          </Typography>
        </View>

        <View className="my-3">
          <Typography variant="bodyBold" style={{ color: colors.text }} className="mb-2 ms-3 text-md">
            Name
          </Typography>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
            placeholderTextColor={colors.subText}
            keyboardType="default"
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

        <View className="mb-3">
          <Typography variant="bodyBold" style={{ color: colors.text }} className="mb-2 ms-3 text-md">
            Phone Number
          </Typography>
          <TextInput
            value={phoneNum}
            onChangeText={setPhoneNum}
            placeholder="(+234)"
            placeholderTextColor={colors.subText}
            keyboardType="phone-pad"
            className="h-12 rounded-2xl px-4"
            style={[
              {
                backgroundColor: colors.fieldBg,
                height: 55,
                color: colors.text,
              }
            ]}
            onSubmitEditing={handleSignIn}
          />
        </View>

        <View className="mb-3">
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
              className="flex-1 h-12 rounded-2xl px-4"
              style={[
                {
                  backgroundColor: colors.fieldBg,
                  height: 55,
                  color: colors.text,
                }
              ]}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4"
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
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
              value={confPassword}
              onChangeText={setConfPassword}
              placeholder="Enter Password"
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
              onSubmitEditing={handleSignIn}
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

        <View className="flex-row items-center mt-3 mb-6">
          <CustomCheckbox
            bgColor={colors.brand}
            borderColor={colors.brand}
            value={termsAgreement}
            onValueChange={setTermsAgreement}
            label="I agree to the "
          />

          <TouchableOpacity
            disabled={loading}
            onPress={() => alert("Terms of Service and Privacy Policy Pressed")}
          >
            <Typography variant="bodyBold" style={{ color: colors.outline }}>
              Terms of Service and Privacy Policy
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Sign in */}
        <View>
          <Button
            title={loading ? "" : "Sign up"}
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
        <View className="flex-row items-center mt-6 mb-6">
          <View style={{ flex: 1, height: 1, backgroundColor: colors.divider }} />
          <Typography variant="caption" style={{ color: colors.subText }} className="mx-3 text-xs">
            Or Continue with
          </Typography>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.divider }} />
        </View>

        {/* Social buttons */}
        <View
          className="flex-row items-center justify-center gap-10 mb-8">
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
            <AntDesign name="google" size={22} color={colors.outline} />
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
            onPress={() => alert("Continue with Apple")}
            disabled={loading}
          >
            <FontAwesome name="apple" size={24} color={colors.text === "#ffffff" ? "#f3f4f6" : "#5b5b5b"} />
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
            onPress={() => alert("Continue with Facebook")}
            disabled={loading}
          >
            <FontAwesome name="facebook" size={22} color={colors.outline} />
          </TouchableOpacity>
        </View>

        {/* Sign up link */}
        <View className="flex items-center justify-center mb-8">
          <View className="flex-row items-center">
            <Typography variant="body" style={{ color: colors.subText }} className="text-center">
              Already have an account?
            </Typography>
            <TouchableOpacity
              onPress={() => router.replace("/auth/Login")}
              disabled={loading}
            >
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
    </SafeAreaView>
  );
}