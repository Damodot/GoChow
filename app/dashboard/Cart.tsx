import { useRouter } from 'expo-router';
import { ArrowLeft, Heart, Minus, Plus, Trash } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    ListRenderItem,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Order {
    id: string;
    name: string;
    time: string;
    rating: number;
    price: number;
    // image: ImageSourcePropType;
}

interface OrderWithQuantity extends Order {
    quantity: number;
}

const ordersData: Order[] = [
    {
        id: '1',
        name: 'Chinese Fried Rice',
        time: '50mins',
        rating: 4.9,
        price: 2500,
        // image: require('../assets/chinese-fried-rice.png'),
    },
    {
        id: '2',
        name: 'Chicken shawarma',
        time: '50mins',
        rating: 4.9,
        price: 3500,
        // image: require('../assets/chicken-shawarma.png'),
    },
    {
        id: '3',
        name: 'Coca cola',
        time: '50mins',
        rating: 4.9,
        price: 500,
        // image: require('../assets/coca-cola.png'),
    },
    {
        id: '4',
        name: 'Eva water',
        time: '50mins',
        rating: 4.9,
        price: 500,
        // image: require('../assets/eva-water.png'),
    },
];

export default function MyOrder() {
    const router = useRouter();
    const [orders, setOrders] = useState<OrderWithQuantity[]>(
        ordersData.map(item => ({ ...item, quantity: 1 }))
    );

    const increment = (id: string): void => {
        setOrders(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrement = (id: string): void => {
        setOrders(prev =>
            prev.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id: string): void => {
        setOrders(prev => prev.filter(item => item.id !== id));
    };

    const renderItem: ListRenderItem<OrderWithQuantity> = ({ item }) => (
        <View className="flex-row items-center bg-white p-4 rounded-xl mb-4 shadow">
            <Image
                // source={item.image}
                className="w-16 h-16 rounded-xl mr-4"
            />

            <View className="flex-1">
                <Text className="text-lg font-bold">{item.name}</Text>
                <Text className="text-gray-400">{item.time} • ⭐ {item.rating}</Text>
                <Text className="text-black font-semibold mt-1">₦{item.price}</Text>
            </View>

            {item.name === 'Chicken shawarma' ? (
                <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    className="bg-red-500 p-3 rounded-full"
                >
                    <Trash color="white" size={20} />
                </TouchableOpacity>
            ) : (
                <View className="flex-row items-center border rounded-full border-gray-300">
                    <TouchableOpacity onPress={() => decrement(item.id)} className="p-2">
                        <Minus size={16} />
                    </TouchableOpacity>

                    <Text className="px-3 text-lg">{item.quantity}</Text>

                    <TouchableOpacity onPress={() => increment(item.id)} className="p-2">
                        <Plus size={16} />
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity className="ml-3">
                <Heart color="#FF0000" size={20} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            {/* Header - uses expo-router useRouter for navigation */}
            <View className="flex-row items-center px-4 py-3 bg-white shadow">
                <TouchableOpacity onPress={() => router.back()} className="p-2 mr-3">
                    <ArrowLeft size={24} />
                </TouchableOpacity>

                <Text className="text-2xl font-bold">My Order</Text>
            </View>

            <View className="flex-1 p-4">
                <FlatList
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                />

                {/* Footer example: subtotal + checkout button */}
                <View className="bg-white p-4 rounded-xl shadow mt-4">
                    <View className="flex-row justify-between mb-3">
                        <Text className="text-lg">Subtotal</Text>
                        <Text className="text-lg font-bold">
                            ₦{orders.reduce((s, it) => s + it.price * it.quantity, 0)}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            // Replace with your navigation to checkout or business logic
                            // router.push('/checkout');
                        }}
                        className="bg-black p-3 rounded-xl items-center"
                    >
                        <Text className="text-white font-bold">Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
