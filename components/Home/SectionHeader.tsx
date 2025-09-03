import { Typography } from "@/components/Typography";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  onPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onPress }) => {
    const colors = useTheme();

    return (
        <View className="flex-row justify-between items-center">
            {onPress && <TouchableOpacity className="w-full flex-row items-center justify-between">
                <Typography variant="h3" style={{ color: colors.text }}>
                    {title}
                </Typography>
                <Typography variant="bodyBold" style={{ color: '#ff3d00' }}>
                    View All
                </Typography>
            </TouchableOpacity>}
        </View>
    );
};

export default SectionHeader;