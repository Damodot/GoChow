import { Typography } from "@/components/Typography";
import Button from "@/components/ui/Button";
import { useFonts } from "@/hooks/useFonts";
import { useColorScheme } from "nativewind";
import React, { useRef, useState } from "react";
import { Animated, Dimensions, Easing, Image, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get("window");

const slides = [
    {
        id: 1,
        title: "Find the Food You Love",
        description: "Lorem ipsum dolor sit amet consectetur.",
        image: require("@/assets/images/onboarding1.png"),
    },
    {
        id: 2,
        title: "Fast Delivery",
        description: "Get your food delivered to your door in minutes.",
        image: require("@/assets/images/onboarding2.png"),
    },
    {
        id: 3,
        title: "Secure Payment",
        description: "Safe and secure payment options for a smooth checkout.",
        image: require("@/assets/images/onboarding3.png"),
    }
];

export default function OnboardingScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const { fontsLoaded } = useFonts();

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const dotAnimation = useRef(new Animated.Value(0)).current;

    const handleNext = () => {
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
            console.log("Finished onboarding");
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
        const dotColors = isDark ? {
            active: "#004aa9",
            inactive: "#4b5563"
        } : {
            active: "#004aa9",
            inactive: "#9ca3af"
        };

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
                            outputRange: [dotColors.inactive, dotColors.active, dotColors.inactive],
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

    if (!fontsLoaded) {
        return null;
    }

    const bg = isDark ? "#0b0b0f" : "#ffffff";
    const text = isDark ? "#ffffff" : "#111827";
    const subText = isDark ? "#cbd5e1" : "#6b7280";

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
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
                                    className="w-72 h-72 mb-8"
                                    resizeMode="contain"
                                />

                                {/* Title */}
                                <Typography variant="h1" style={{ color: text }} className="text-center mb-3">
                                    {item.title}
                                </Typography>

                                {/* Description */}
                                <Typography variant="body" style={{ color: subText }} className="text-center leading-6 px-6">
                                    {item.description}
                                </Typography>
                            </View>
                        ))}
                    </ScrollView>

                    {renderDots()}

                    <View className="mb-12 w-[85%] m-auto">
                        <Button
                            title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
                            onPress={handleNext}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}