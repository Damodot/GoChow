import { Typography } from "@/components/Typography";
import Button from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';
import React, { useRef, useState } from "react";
import { Animated, Dimensions, Easing, Image, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get("window");

const slides = [
    {
        id: 1,
        title: "Find the Food You Love",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, libero.",
        image: require("@/assets/images/onboarding1.png"),
    },
    {
        id: 2,
        title: "Easy Payment, Live Tracking",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, perspiciatis pariatur exercitationem quia ab eveniet itaque?",
        image: require("@/assets/images/onboarding2.png"),
    },
    {
        id: 3,
        title: "Fast Delivery",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptas dolorum facere rem voluptates. Consectetur.",
        image: require("@/assets/images/onboarding3.png"),
    }
];

export default function OnboardingScreen() {
    const { width: screenWidth } = Dimensions.get("window");
    const MAX_BUTTON_WIDTH = screenWidth > 768 ? 500 : 450;
    const colors = useTheme();

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const dotAnimation = useRef(new Animated.Value(0)).current;

    const handleNext = async () => {
        if (currentIndex < slides.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);

            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    x: nextIndex * width,
                    animated: true
                });
            }
        } else {
            await AsyncStorage.setItem("hasSeenOnboarding", "true");
            router.replace('/FirstMainPage')
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = event.nativeEvent.contentOffset.x;

        // Update current index based on scroll position
        const index = Math.floor(offset / width);
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }

        // Animate the dot position
        Animated.timing(dotAnimation, {
            toValue: offset / width,
            duration: 100,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();
    };

    const renderDots = () => {
        return (
            <View className="flex-row justify-center mb-5">
                {slides.map((_, index) => {
                    const dotStyle = {
                        width: dotAnimation.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [8, 24, 8],
                            extrapolate: 'clamp',
                        }),
                        backgroundColor: dotAnimation.interpolate({
                            inputRange: [index - 0.5, index, index + 0.5],
                            outputRange: [colors.subText, colors.outline, colors.subText],
                            extrapolate: 'clamp',
                        }),
                        borderRadius: dotAnimation.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [4, 12, 4],
                            extrapolate: 'clamp',
                        }),
                        height: 8,
                        marginHorizontal: 4,
                    };

                    return (
                        <Animated.View
                            key={index}
                            style={dotStyle}
                        />
                    );
                })}
            </View>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
                <StatusBar
                    barStyle={colors.text === "#ffffff" ? "light-content" : "dark-content"}
                    backgroundColor="transparent"
                    translucent
                />

                <View style={{ flex: 1 }}>
                    {/* Logo at the top - smaller and lower */}
                    <View className="items-center mt-12 mb-6">
                        <Image
                            source={require("@/assets/images/goChowLogo.png")}
                            className="w-30 h-20"
                            resizeMode="contain"
                        />
                    </View>

                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        bounces={false}
                        scrollIndicatorInsets={{ right: 1 }}
                    >
                        {slides.map((item) => (
                            <View
                                key={item.id}
                                style={{ width }}
                                className="flex-1 items-center justify-center px-8"
                            >
                                {/* Onboarding image - bigger */}
                                <Image
                                    source={item.image}
                                    style={{
                                        width: Math.min(300, width * 0.7),
                                        height: Math.min(300, width * 0.7),
                                        marginBottom: 32,
                                    }}
                                    resizeMode="contain"
                                />

                                {/* Title */}
                                <Typography variant="h1" style={{ color: colors.text }} className="text-center mb-3">
                                    {item.title}
                                </Typography>

                                {/* Description */}
                                <Typography
                                    variant="body"
                                    style={{ color: colors.subText }}
                                    className="text-center leading-6 px-4"
                                >
                                    {item.description}
                                </Typography>
                            </View>
                        ))}
                    </ScrollView>

                    {renderDots()}

                    {/* Responsive Button Container */}
                    <View className="mb-8 w-full items-center">
                        <View
                            style={{
                                width: '85%',
                                maxWidth: MAX_BUTTON_WIDTH,
                                alignSelf: 'center',
                                margin: 'auto'
                            }}
                        >
                            <Button
                                title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
                                onPress={handleNext}
                                style={{ backgroundColor: colors.btnBg }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}