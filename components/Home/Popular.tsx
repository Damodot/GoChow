import { Typography } from "@/components/Typography";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";

type PopularCardProps = {
    item: {
        image: any;
        title: string;
        rating: number | string;
        reviews: number | string;
        category: string;
    };
};

const PopularCard: React.FC<PopularCardProps> = ({ item }) => {
    const colors = useTheme();

    return (
        <View className="w-full overflow-hidden mt-4">
            <Image
                source={item.image}
                style={{
                    height: 200
                }}
                className="w-full rounded-2xl"
                resizeMode="cover"
            />

            <View>
                <Typography variant="h3" style={{ color: colors.text }} className="text-sm pt-2">
                    {item.title}
                </Typography>

                <View className="flex-row items-center mt-1 pb-1">
                    <Ionicons name="star" size={14} color="#ef4444" />
                    <Typography variant="body" style={{ color: colors.text }} className="ml-1">
                        {item.rating}
                        <Typography variant="body" style={{ color: colors.subText }}>
                            {" "}({item.reviews})
                        </Typography>
                    </Typography>
                    <Typography variant="body" style={{ color: colors.subText }} className="ml-1">
                        {item.category}
                    </Typography>
                </View>
            </View>
        </View>
    );
};

export default PopularCard;