import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { Animated } from "react-native";




export const Skeleton = ({ style }: any) => {
    const colors = useTheme();
    const [anim] = useState(() => new Animated.Value(0));

    React.useEffect(() => {
        const blink = Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        );
        blink.start();
        return () => blink.stop();
    }, []);

    const opacity = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 0.5],
    });

    return (
        <Animated.View
            style={[
                {
                    backgroundColor: colors.fieldBg,
                    borderRadius: 12,
                },
                style,
                { opacity },
            ]}
        />
    );
};