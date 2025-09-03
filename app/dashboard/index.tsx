// app/dashboard/index.tsx
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CenterLogo from "../../components/ui/CurvedTab";

// Import your screens
import { useTheme } from "@/hooks/useTheme";
import ExtrasScreen from "./ExtrasScreen";
import HomeScreen from "./HomeScreen";
import PaymentScreen from "./PaymentScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TAB_COUNT = 5;
const TAB_WIDTH = SCREEN_WIDTH / TAB_COUNT;


const LOGO_WIDTH = Math.round(SCREEN_WIDTH * 30);
const LOGO_HEIGHT = Math.round(LOGO_WIDTH * 0.11112524);

const tabOrder = ["Extras", "Payment", "Home", "Profile", "Settings"] as const;
type TabName = typeof tabOrder[number];

export default function Dashboard() {
    const colors = useTheme()
    return (
        <>
            <SafeAreaView
                edges={['top']}
                style={{ flex: 0, backgroundColor: colors.dashboardbg }}
            />

            <SafeAreaView edges={["left", "right"]} className="flex-1" style={{ backgroundColor: colors.dashboardbg }} >
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            position: "absolute",
                            backgroundColor: "transparent",
                            borderTopWidth: 0,
                            elevation: 0,
                            height: 92,
                            overflow: 'hidden'
                        },
                    }}
                    tabBar={(props) => <FloatingTabBar {...props} />}
                >
                    <Tab.Screen name="Extras" component={ExtrasScreen} />
                    <Tab.Screen name="Payment" component={PaymentScreen} />
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
            </SafeAreaView>
        </>
    );
}

function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
    const activeIndex = state.index;

    // Icon lift animations (native Animated API)
    const animatedValues = useRef(tabOrder.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        animatedValues.forEach((anim, i) => {
            Animated.spring(anim, {
                toValue: i === activeIndex ? -40 : 0,
                friction: 2,
                tension: 20,
                useNativeDriver: true,
            }).start();
        });
    }, [activeIndex, animatedValues]);

    const initialLeft = (SCREEN_WIDTH - LOGO_WIDTH) / 2; // usually negative when LOGO_WIDTH > SCREEN_WIDTH
    // start translateX so SVG center is under activeIndex
    const startTranslate = (activeIndex * TAB_WIDTH + TAB_WIDTH / 2) - SCREEN_WIDTH / 2;
    const svgTranslate = useRef(new Animated.Value(startTranslate)).current;

    useEffect(() => {
        let target = (activeIndex * TAB_WIDTH + TAB_WIDTH / 2) - SCREEN_WIDTH / 2;
        target += (
            activeIndex === 0 ? 5 :
                activeIndex === 1 ? 2 :
                    activeIndex === 3 ? -2 :
                        activeIndex === tabOrder.length - 1 ? -5 : 0
        );

        Animated.spring(svgTranslate, {
            toValue: target,
            friction: 5,
            tension: 50,
            useNativeDriver: true,
        }).start();
    }, [activeIndex, svgTranslate]);

    const getIconSource = (name: string, isFocused: boolean) => {
        switch (name) {
            case "Home":
                return isFocused
                    ? require("../../assets/images/homeFocused.png")
                    : require("../../assets/images/home.png");
            case "Extras":
                return isFocused
                    ? require("../../assets/images/extraFocused.png")
                    : require("../../assets/images/extra.png");
            case "Profile":
                return isFocused
                    ? require("../../assets/images/profileFocused.png")
                    : require("../../assets/images/profile.png");
            case "Settings":
                return isFocused
                    ? require("../../assets/images/settingsFocused.png")
                    : require("../../assets/images/settings.png");
            case "Payment":
                return isFocused
                    ? require("../../assets/images/walletFocused.png")
                    : require("../../assets/images/wallet.png");
            default:
                return require("../../assets/images/home.png");
        }
    };

    return (
        <View className="absolute left-0 right-0 bottom-0 h-24 items-center justify-center" style={styles.container}>{/* SVG (render first so it's behind icons). pointerEvents none so it doesn't capture touches */}
            <Animated.View
                pointerEvents="none"
                className="absolute items-center justify-center"
                style={[
                    {
                        left: initialLeft,
                        width: LOGO_WIDTH,
                        height: LOGO_HEIGHT
                    },
                    {
                        transform: [{ translateX: svgTranslate }],
                        zIndex: 0,
                        elevation: 0,
                    },

                ]}
            >
                <CenterLogo width={LOGO_WIDTH} height={LOGO_HEIGHT} />
            </Animated.View>

            {/* Icons row — on top of SVG */}
            <View className="flex-row w-full px-2 pb-6" style={{ zIndex: 10 }}>
                {tabOrder.map((name, index) => {
                    const isFocused = state.index === index;
                    const route = state.routes.find((r) => r.name === name);
                    const key = route?.key;

                    const onPress = () => {
                        if (!isFocused && key) {
                            const event = navigation.emit({
                                type: "tabPress",
                                target: key,
                                canPreventDefault: true,
                            });
                            if (!event.defaultPrevented) {
                                navigation.navigate(name);
                            }
                        }
                    };

                    const animatedStyle = {
                        transform: [{ translateY: animatedValues[index] }],
                        zIndex: 20,
                        elevation: 20,
                    };

                    return (
                        <TouchableOpacity
                            key={name}
                            onPress={onPress}
                            activeOpacity={1}
                            className="flex-1 items-center justify-center"
                            style={{ width: TAB_WIDTH }}
                        >
                            <Animated.View style={[animatedStyle, styles.iconWrapper]}>
                                <View
                                    // active is transparent; unfocused has white circular background
                                    className={`items-center justify-center`}
                                    style={[
                                        styles.iconCircle,
                                        { backgroundColor: isFocused ? "#ff5821" : 'transparent' },
                                    ]}
                                >
                                    <Image
                                        source={getIconSource(name, isFocused)}
                                        style={[styles.iconImage, { tintColor: isFocused ? "white" : "#9ca3af" }]}
                                        resizeMode="contain"
                                    />
                                </View>
                            </Animated.View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    },
    iconWrapper: {
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center",
    },
    iconCircle: {
        width: 58,
        height: 58,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 8,
    },
    iconImage: {
        width: 26,
        height: 26,
    },
});
