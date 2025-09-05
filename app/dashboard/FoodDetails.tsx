// app/dashboard/FoodDetails.tsx

import { Typography } from "@/components/Typography";
import Button from "@/components/ui/Button";
import CustomCheckbox from "@/components/ui/CustomCheckbox";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    SectionList,
    StatusBar,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedQuantitySelector from "../../components/ui/AnimatedQuantitySelector";
import { Skeleton } from "../../components/ui/Skeleton";


// 🔹 Define types for food
type FoodOption = { label: string; price: string };

type FoodObj = {
    foodName: string;
    foodPrice: string;
    foodInfo: string;
    image: string;
    types: {
        baseFood: FoodOption[];
        extras: FoodOption[];
        extraProtein: FoodOption[];
        drinks: FoodOption[];
    };
};

export default function FoodDetails() {
    const [loading, setLoading] = useState(true);
    const colors = useTheme();
    const { bottom } = useSafeAreaInsets();
    const [quantity, setQuantity] = useState<number>(1);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // 🔹 Get params from router
    const { food } = useLocalSearchParams<{ food?: string }>();
    const foodObj: FoodObj | null = food ? JSON.parse(food) : null;

    if (!foodObj) {
        return (
            <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.dashboardbg }}>
                <Typography variant="body">No food selected</Typography>
            </View>
        );
    }

    const [selectedBaseFood, setSelectedBaseFood] = useState<FoodOption | null>(null);
    const [selectedExtras, setSelectedExtras] = useState<FoodOption[]>([]);
    const [selectedProtein, setSelectedProtein] = useState<FoodOption[]>([]);
    const [selectedDrinks, setSelectedDrinks] = useState<FoodOption[]>([]);
    const [extraQuantities, setExtraQuantities] = useState<Record<string, number>>({});
    const [proteinQuantities, setProteinQuantities] = useState<Record<string, number>>({});
    const [drinkQuantities, setDrinkQuantities] = useState<Record<string, number>>({});

    // 🔹 Auto-select first base food on load
    useEffect(() => {
        if (foodObj && !selectedBaseFood) {
            const firstItem = foodObj.types.baseFood[0];
            if (firstItem) {
                setSelectedBaseFood(firstItem);
            }
        }
    }, [foodObj, selectedBaseFood]);

    // 🔹 Prepare grouped sections with selection logic
    const sections = [
        // Base Food (unchanged)
        {
            title: "Base Food",
            data: foodObj.types.baseFood,
            selected: selectedBaseFood,
            toggle: (item: FoodOption) => setSelectedBaseFood(item),
            showQuantity: false,
        },
        // Extras (with quantity)
        {
            title: "Extras",
            data: foodObj.types.extras,
            selected: selectedExtras,
            toggle: (item: FoodOption) => {
                const exists = selectedExtras.some(i => i.label === item.label);
                if (exists) {
                    setSelectedExtras(selectedExtras.filter(i => i.label !== item.label));
                    setExtraQuantities(prev => {
                        const newQuantities = { ...prev };
                        delete newQuantities[item.label];
                        return newQuantities;
                    });
                } else {
                    setSelectedExtras([...selectedExtras, item]);
                    setExtraQuantities(prev => ({ ...prev, [item.label]: 1 }));
                }
            },
            getQuantity: (item: FoodOption) => extraQuantities[item.label] || 0,
            setQuantity: (item: FoodOption, qty: number) => {
                setExtraQuantities(prev => ({ ...prev, [item.label]: qty }));
            },
            showQuantity: true,
        },
        // Extra Protein
        {
            title: "Extra Protein",
            data: foodObj.types.extraProtein,
            selected: selectedProtein,
            toggle: (item: FoodOption) => {
                const exists = selectedProtein.some(i => i.label === item.label);
                if (exists) {
                    setSelectedProtein(selectedProtein.filter(i => i.label !== item.label));
                    setProteinQuantities(prev => {
                        const newQuantities = { ...prev };
                        delete newQuantities[item.label];
                        return newQuantities;
                    });
                } else {
                    setSelectedProtein([...selectedProtein, item]);
                    setProteinQuantities(prev => ({ ...prev, [item.label]: 1 }));
                }
            },
            getQuantity: (item: FoodOption) => proteinQuantities[item.label] || 0,
            setQuantity: (item: FoodOption, qty: number) => {
                setProteinQuantities(prev => ({ ...prev, [item.label]: qty }));
            },
            showQuantity: true,
        },
        // Drinks
        {
            title: "Drinks",
            data: foodObj.types.drinks,
            selected: selectedDrinks,
            toggle: (item: FoodOption) => {
                const exists = selectedDrinks.some(i => i.label === item.label);
                if (exists) {
                    setSelectedDrinks(selectedDrinks.filter(i => i.label !== item.label));
                    setDrinkQuantities(prev => {
                        const newQuantities = { ...prev };
                        delete newQuantities[item.label];
                        return newQuantities;
                    });
                } else {
                    setSelectedDrinks([...selectedDrinks, item]);
                    setDrinkQuantities(prev => ({ ...prev, [item.label]: 1 }));
                }
            },
            getQuantity: (item: FoodOption) => drinkQuantities[item.label] || 0,
            setQuantity: (item: FoodOption, qty: number) => {
                setDrinkQuantities(prev => ({ ...prev, [item.label]: qty }));
            },
            showQuantity: true,
        },
    ];

    // 🔹 Calculate total price
    const calculateTotal = (): number => {
        let total = Number(foodObj.foodPrice.replace(/,/g, ''));

        if (selectedBaseFood) {
            total += Number(selectedBaseFood.price.replace(/₦|,/g, ''));
        }

        // Add extras with quantity
        selectedExtras.forEach(item => {
            const qty = extraQuantities[item.label] || 1;
            total += Number(item.price.replace(/₦|,/g, '')) * qty;
        });

        selectedProtein.forEach(item => {
            const qty = proteinQuantities[item.label] || 1;
            total += Number(item.price.replace(/₦|,/g, '')) * qty;
        });

        selectedDrinks.forEach(item => {
            const qty = drinkQuantities[item.label] || 1;
            total += Number(item.price.replace(/₦|,/g, '')) * qty;
        });

        return total * quantity;
    };

    const total = calculateTotal();

    return (
        <View className="flex-1" style={{ backgroundColor: colors.dashboardbg }}>
            <StatusBar barStyle={"light-content"} />

            {/* Header Image (Always visible or placeholder) */}
            <View className="relative">
                <Image
                    source={require("@/assets/images/popular.png")}
                    className="w-full"
                    resizeMode="cover"
                    style={{ height: 280 }}
                />

                {/* Black Tint Overlay */}
                <View
                    className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                />

                {/* Close Button */}
                <TouchableOpacity
                    className="absolute items-center justify-center rounded-full"
                    style={{
                        top: 50,
                        right: 16,
                        width: 36,
                        height: 36,
                        backgroundColor: colors.bg + '80',
                    }}
                    onPress={() => router.back()}
                >
                    <Ionicons name="close" size={24} color="#007AFF" />
                </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <View
                className="flex-1"
            >
                {loading ? (
                    // 🔹 SKELETON LOADER (Only for content below image)
                    <View className="px-4">
                        {/* Food Info Skeleton */}
                        <View className="mb-6">
                            <Skeleton style={{ height: 28, width: '80%', marginBottom: 8, borderRadius: 4 }} />
                            <Skeleton style={{ height: 20, width: '60%', marginBottom: 8, borderRadius: 4 }} />
                            <Skeleton style={{ height: 16, width: '100%', marginBottom: 4, borderRadius: 4 }} />
                            <Skeleton style={{ height: 16, width: '90%', borderRadius: 4 }} />
                        </View>

                        {/* Options List Skeleton */}
                        {[
                            "Base Food",
                            "Extras",
                            "Extra Protein",
                            "Drinks"
                        ].map((sectionTitle, idx) => (
                            <View key={idx} className="mb-6">
                                {/* Section Header */}
                                <Skeleton style={{ height: 20, width: 120, marginBottom: 8, borderRadius: 4 }} />
                                <Skeleton style={{ height: 14, width: 180, marginBottom: 12, borderRadius: 4 }} />

                                {/* 2–3 option rows per section */}
                                {[...Array(2)].map((_, i) => (
                                    <View
                                        key={i}
                                        className="flex-row justify-between items-center py-3 rounded-lg mb-2 mx-4"
                                    >
                                        {/* Checkbox Placeholder */}
                                        <View className="flex-row items-center">
                                            <Skeleton
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: 10,
                                                    marginRight: 8,
                                                }}
                                            />
                                            <Skeleton
                                                style={{
                                                    height: 16,
                                                    width: 100,
                                                    borderRadius: 4,
                                                }}
                                            />
                                        </View>

                                        {/* Price Placeholder */}
                                        <Skeleton
                                            style={{
                                                height: 16,
                                                width: 50,
                                                borderRadius: 4,
                                            }}
                                        />
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                ) : (
                    // ✅ Real Content (Your Original Design — Unchanged)
                    <>
                        {/* Food Info */}
                        <View className="p-4">
                            <Typography variant="h2" className="font-bold" style={{ color: colors.text }}>
                                {foodObj.foodName}
                            </Typography>
                            <Typography variant="bodyBold" className="mt-1" style={{ color: colors.text }}>
                                ₦{foodObj.foodPrice}
                            </Typography>
                            <Typography variant="body" className="mt-1" style={{ color: colors.subText }}>
                                {foodObj.foodInfo}
                            </Typography>
                        </View>

                        {/* Options List */}
                        <SectionList
                            style={{ backgroundColor: colors.dashboardbg }}
                            sections={sections}
                            stickySectionHeadersEnabled={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.label}
                            renderSectionHeader={({ section }) => (
                                <View className="px-4 mt-4">
                                    <Typography
                                        variant="bodyBold"
                                        style={{ color: colors.text }}
                                    >
                                        {section.title}
                                    </Typography>
                                    <Typography
                                        variant="body"
                                        className="mt-1"
                                        style={{ color: colors.subText }}
                                    >
                                        {section.title === "Base Food"
                                            ? "Choose one base option"
                                            : "Choose any you want"}
                                    </Typography>
                                </View>
                            )}
                            renderItem={({ item, section }: { item: FoodOption; section: any }) => {
                                const isSelected = Array.isArray(section.selected)
                                    ? section.selected.some((i: FoodOption) => i.label === item.label)
                                    : section.selected?.label === item.label;

                                return (
                                    <TouchableOpacity
                                        key={item.label}
                                        className="flex-row justify-between items-center py-3 rounded-lg mb-2 mx-4"
                                        onPress={() => section.toggle(item)}
                                    >
                                        <CustomCheckbox
                                            bgColor={colors.isFocusedIcon}
                                            borderColor={colors.isFocusedIcon}
                                            value={isSelected}
                                            onValueChange={() => section.toggle(item)}
                                            label={item.label}
                                        />

                                        {/* Conditional: Show Price OR Animated QuantitySelector */}
                                        {section.showQuantity ? (
                                            isSelected ? (
                                                <AnimatedQuantitySelector
                                                    quantity={section.getQuantity(item)}
                                                    onQuantityChange={(qty) => section.setQuantity(item, qty)}
                                                    visible={true}
                                                    onAppear={() => {
                                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                                    }}
                                                />
                                            ) : (
                                                <Typography variant="body" style={{ color: colors.subText }}>
                                                    {item.price}
                                                </Typography>
                                            )
                                        ) : (
                                            <Typography variant="body" style={{ color: colors.subText }}>
                                                {item.price}
                                            </Typography>
                                        )}
                                    </TouchableOpacity>
                                );
                            }}
                            // Prevent SectionList from adding extra padding
                            contentContainerStyle={{ paddingHorizontal: 0 }}
                        />
                    </>
                )}
            </View>

            {/* Bottom Bar (Always visible, but disabled if no foodObj) */}
            <View
                className="flex-row items-center justify-between px-4"
                style={{
                    backgroundColor: colors.tabBg,
                    paddingBottom: bottom + 10,
                    paddingTop: 10,
                }}
            >
                {loading ? (
                    <>
                        <Skeleton style={{ height: 30, width: '25%', borderRadius: 30 }} />
                        <Skeleton style={{ height: 50, width: '60%', borderRadius: 30 }} />
                    </>
                ) : (
                    <>
                        <QuantitySelector
                            quantity={quantity}
                            onQuantityChange={setQuantity}
                            minQuantity={1}
                        />

                        <View className="w-2/3">
                            <Button
                                title={foodObj ? (
                                    selectedBaseFood
                                        ? `Add ${quantity} to cart • ₦${total.toLocaleString()}`
                                        : `Select a base food to continue`
                                ) : "Loading..."}
                                onPress={() => {
                                    if (!foodObj || !selectedBaseFood) return;
                                    // Add to cart logic
                                }}
                            // disabled={!foodObj || !selectedBaseFood}
                            />
                        </View>
                    </>
                )}
            </View>
        </View>
    );
}