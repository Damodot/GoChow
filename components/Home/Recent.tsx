// components/RecentItem.tsx
import { Typography } from "@/components/Typography";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";

interface RecentItemProps {
    item: {
        image: any;
        title: string;
        rating: number | string;
        reviews: number | string;
        category: string;
    };
}

const RecentItem: React.FC<RecentItemProps> = ({ item }) => {
    const colors = useTheme();

    return (
        <View className="flex-row items-center mb-4">
            <Image source={item.image} className="w-16 h-16 rounded-md" resizeMode="cover" />
            <View className="ml-3 flex-1">
                <Typography variant="bodyBold" style={{ color: colors.text }} className="text-sm">
                    {item.title}
                </Typography>
                <View className="flex-row items-center mt-1">
                    <Ionicons name="star" size={14} color="#ef4444" />
                    <Typography variant="caption" style={{ color: colors.text }} className="ml-1">
                        {item.rating}
                        <Typography variant="caption" style={{ color: colors.subText }}>
                            {" "}({item.reviews})
                        </Typography>
                    </Typography>
                </View>
                <Typography variant="caption" style={{ color: colors.subText }} className="mt-1">
                    {item.category}
                </Typography>
            </View>
        </View>
    );
};

export default RecentItem;