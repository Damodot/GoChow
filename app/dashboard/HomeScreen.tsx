import PopularCard from "@/components/Home/Popular";
import SectionHeader from "@/components/Home/SectionHeader";
import { Typography } from "@/components/Typography";
import { Skeleton } from '@/components/ui/Skeleton';
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ======= MOCK DATA =======
const categories = [
    { id: "1", title: "Offers", image: require("@/assets/images/offers.png") },
    { id: "2", title: "Pastries", image: require("@/assets/images/pasteries.png") },
    { id: "3", title: "Desserts", image: require("@/assets/images/desserts.png") },
    { id: "4", title: "Milkshake", image: require("@/assets/images/milkshake.png") },
];

const loopedList = ["Popular Resturant", "Most Popular", "Recent Items"];

const popular = [
    {
        id: "1",
        title: "Bakes by Joy Pastries",
        image: require("@/assets/images/bakes.png"),
        rating: "4.9",
        reviews: "107 ratings",
        category: "Cafe",
    },
    {
        id: "2",
        title: "Fresh Meal by Yamal",
        image: require("@/assets/images/popular.png"),
        rating: "4.8",
        reviews: "89 ratings",
        category: "Cafe",
    },
];

let selectedFoodObj = {
    image: 'popular.png',
    foodName: "Rice & Chicken",
    foodPrice: "2,500",
    foodInfo:
        "A delicious meal of rice served with chicken and a side of vegetables.",
    types: {
        baseFood: [
            { label: "Jollof Rice", price: "₦0" },
            { label: "Fried Rice", price: "₦0" },
            { label: "Jollof Rice & Fried Rice", price: "₦0" },
        ],
        extras: [
            { label: "Plantain", price: "₦300" },
            { label: "Coleslaw", price: "₦500" },
            { label: "Extra Rice", price: "₦500" },
        ],
        extraProtein: [
            { label: "Chicken", price: "₦1500" },
            { label: "Croaker Fish", price: "₦2000" },
            { label: "Big Fish", price: "₦1000" },
            { label: "Beef", price: "₦500" },
        ],
        drinks: [
            { label: "Maltina", price: "₦800" },
            { label: "Coca Cola", price: "₦500" },
            { label: "Fanta", price: "₦500" },
            { label: "Pepsi", price: "₦500" },
        ],
    },
};

export default function HomeScreen() {
    const [loading, setLoading] = useState(true);
    const colors = useTheme();
    const { width } = Dimensions.get("window");
    const imageSize = width / 4;
    const { bottom } = useSafeAreaInsets();

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleFoodPress = (item: {}) => {
        router.push({
            pathname: '/dashboard/FoodDetails',
            params: { food: JSON.stringify(selectedFoodObj) as string }
        });
    }

    return (
        <View className="flex-1" style={{ backgroundColor: colors.dashboardbg }}>
            {/* Fixed Header Section */}
            <View className="px-5 pt-10">
                {/* Header */}
                <View className="flex-row justify-between items-center">
                    <Typography variant="h1" style={{ color: colors.text }}>
                        Hello, User!
                    </Typography>
                    <TouchableOpacity
                        onPress={() => router.push('/dashboard/Cart')}
                    >
                        <Image
                            source={require("@/assets/images/shoppingCart.png")}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                {/* Location */}
                <Typography variant="body" style={{ color: colors.subText }} className="mt-3 text-2xl">
                    Delivering to
                </Typography>
                <TouchableOpacity className="flex-row items-center mb-3">
                    <Typography
                        variant="h3"
                        style={{ color: colors.text }}
                        className="mr-1 font-light text-2xl"
                    >
                        Current Location
                    </Typography>
                    <Ionicons name="chevron-down" size={18} color={colors.text} />
                </TouchableOpacity>

                {/* Search */}
                <View
                    className="flex-row items-center"
                    style={{
                        backgroundColor: colors.fieldBg,
                        borderRadius: 20,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                    }}
                >
                    <Ionicons name="search-outline" size={20} color={colors.subText} />
                    <TextInput
                        placeholder="Search Food"
                        placeholderTextColor={colors.subText}
                        style={{
                            color: colors.subText,
                            fontSize: 15,
                            flex: 1,
                            marginLeft: 8,
                        }}
                    />
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                className="px-6 mt-3"
                contentContainerStyle={{ paddingBottom: bottom + 80 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Conditional Rendering: Skeleton or Content */}
                {loading ? (
                    <>
                        {/* Skeleton for Categories */}
                        <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                            {categories.map((_, i) => (
                                <View key={i} style={{ marginRight: 24, alignItems: 'center' }}>
                                    <Skeleton
                                        style={{
                                            width: imageSize - 25,
                                            height: imageSize - 25,
                                            borderRadius: 16,
                                            marginBottom: 8,
                                        }}
                                    />
                                    <Skeleton
                                        style={{
                                            width: 60,
                                            height: 16,
                                            borderRadius: 4,
                                        }}
                                    />
                                </View>
                            ))}
                        </View>

                        {/* Skeleton for Popular Items */}
                        <Skeleton
                            style={{
                                width: '100%',
                                height: 20,
                                borderRadius: 16,
                                marginBottom: 16,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 16,
                                marginBottom: 16,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: '100%',
                                height: 30,
                                borderRadius: 16,
                                marginBottom: 16,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 16,
                                marginBottom: 16,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: '100%',
                                height: 30,
                                borderRadius: 16,
                                marginBottom: 16,
                            }}
                        />
                    </>
                ) : (
                    <>
                        {/* Categories List */}
                        <FlatList
                            data={categories}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ marginVertical: 15 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="items-center mr-6"
                                    onPress={() => alert(`You pressed: ${item.title}`)}
                                >
                                    <Image
                                        source={item.image}
                                        style={{ width: imageSize - 25, height: imageSize - 25 }}
                                        className="rounded-2xl mb-2"
                                    />
                                    <Typography
                                        variant="body"
                                        style={{ color: colors.text, fontSize: 16 }}
                                    >
                                        {item.title}
                                    </Typography>
                                </TouchableOpacity>
                            )}
                        />

                        {/* Section Header */}
                        <SectionHeader
                            title={loopedList[0]}
                            onPress={() => alert('Section header pressed')}
                        />

                        {/* Popular Items List */}
                        <FlatList
                            data={popular}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleFoodPress(item)}>
                                    <PopularCard item={item} />
                                </TouchableOpacity>
                            )}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </>
                )}
            </ScrollView>
        </View>
    );
}