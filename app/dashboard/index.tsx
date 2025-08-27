import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StatusBar, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurvedDark from "../../assets/images/curvedTabElement4.svg";
import CurvedLight from "../../assets/images/curvedTabElementlight.svg";

import ExtrasScreen from './ExtrasScreen';
import HomeScreen from './HomeScreen';
import PaymentScreen from './PaymentScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get('window');


// ---------- Custom Tab Bar ----------
function CurvedTabBar(props: BottomTabBarProps & {
    tabBg: string;
    tabIconColor: string;
    activeTabColor: string;
    isDark: boolean;
}) {
    const { state, descriptors, navigation, tabBg, tabIconColor, activeTabColor, isDark } = props;


    const [barWidth, setBarWidth] = useState(SCREEN_WIDTH);
    const routesCount = state.routes.length;
    const TAB_WIDTH = barWidth / routesCount;

    // Keep your same proportion for the curved art
    const imageSize = (2 * barWidth) / 5;

    // Start under the initially focused tab (e.g., Home)
    const translateX = useRef(
        new Animated.Value(state.index * TAB_WIDTH + TAB_WIDTH / 2 - imageSize / 2)
    ).current;

    // When index (active tab) changes or barWidth changes, slide the indicator
    useEffect(() => {
        const iconCenter = state.index * TAB_WIDTH + TAB_WIDTH / 2;
        Animated.spring(translateX, {
            toValue: iconCenter - imageSize / 2,
            friction: 5,
            tension: 20,
            useNativeDriver: true,
        }).start();
    }, [state.index, TAB_WIDTH, imageSize, translateX]);

    const getIconFor = (name: string, isFocused: boolean) => {
        switch (name) {
            case 'Home':
                return isFocused
                    ? require('../../assets/images/homeFocused.png')
                    : require('../../assets/images/home.png');
            case 'Extras':
                return isFocused
                    ? require('../../assets/images/extraFocused.png')
                    : require('../../assets/images/extra.png');
            case 'Profile':
                return isFocused
                    ? require('../../assets/images/profileFocused.png')
                    : require('../../assets/images/profile.png');
            case 'Settings':
                return isFocused
                    ? require('../../assets/images/settingsFocused.png')
                    : require('../../assets/images/settings.png');
            case 'Payment':
                return isFocused
                    ? require('../../assets/images/walletFocused.png')
                    : require('../../assets/images/wallet.png');
            default:
                return require('../../assets/images/home.png');
        }
    };


    return (
        <View
            onLayout={e => setBarWidth(e.nativeEvent.layout.width)}
            style={{
                backgroundColor: tabBg,
                height: 70,
                borderTopWidth: 0,
                overflow: 'hidden',
                paddingTop: 20,
            }}
        >
            {/* Curved element (rendered once, moves under the focused icon) */}
            <Animated.View
                pointerEvents="none"
                style={{
                    position: 'absolute',
                    top: -112,
                    left: 0,
                    width: imageSize,
                    height: imageSize / 2,
                    transform: [{ translateX }],
                    alignItems: 'center',
                }}
            >
                {isDark ? (
                    <CurvedDark width="390%" height="390%" />
                ) : (
                    <CurvedLight width="390%" height="390%" />
                )}
            </Animated.View>


            {/* Icons row */}
            {/* Icons row */}
            <View style={{ flexDirection: 'row' }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const iconSource = getIconFor(route.name, isFocused);

                    // Each tab gets its own animated value
                    const translateY = useRef(new Animated.Value(0)).current;

                    useEffect(() => {
                        Animated.spring(translateY, {
                            toValue: isFocused ? -18 : 0, 
                            friction: 5,
                            tension: 20,
                            useNativeDriver: true,
                        }).start();
                    }, [isFocused]);

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Animated.View
                                style={[
                                    {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 50,
                                        height: 50,
                                        borderRadius: 25,
                                        transform: [{ translateY }],
                                    },
                                    isFocused && {
                                        backgroundColor: '#ff5821',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 3 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 4,
                                        elevation: 6,
                                    },
                                ]}
                            >
                                <Image
                                    source={iconSource}
                                    resizeMode="contain"
                                    style={{
                                        width: 23,
                                        height: 23,
                                        tintColor: isFocused ? '#ffffff' : tabIconColor,
                                    }}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

// ---------- Main Dashboard ----------
export default function Dashboard() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const brand = '#004aa9';
    const bg = isDark ? '#1e2f40' : '#ffffff';
    const tabBg = isDark ? '#1f2937' : '#ededed';
    const tabIconColor = isDark ? '#9ca3af' : '#6b7280';
    const activeTabColor = isDark ? '#60A5FA' : brand;

    return (
        <>
            {/* Top safe area only */}
            <SafeAreaView edges={['top']} style={{ flex: 0, backgroundColor: bg }} />

            {/* Bottom part (Navigator itself) */}
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1, backgroundColor: tabBg }}>
                <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={{ headerShown: false }}
                    tabBar={props => (
                        <CurvedTabBar
                            {...props}
                            tabBg={tabBg}
                            tabIconColor={tabIconColor}
                            activeTabColor={activeTabColor}
                            isDark={isDark}
                        />
                    )}
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
