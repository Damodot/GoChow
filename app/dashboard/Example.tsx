import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type Timer = {
  id: number;
  count: number;
  running: boolean;
};

const EXAMPLE = () => {
  const [timers, setTimers] = useState<Timer>([]);

  // Add a new timer
  const addTimer = () => {
    const newTimer: Timer = {
      id: Date.now(), // unique id
      count: 0,
      running: true,
    };
    setTimers((prev) => [...prev, newTimer]);
  };

  // TODO: Start interval for each running timer
  useEffect(() => {
    // Loop through timers and update counts
    // TIP: You'll need setInterval here
    // Remember to clear intervals on cleanup!
  }, [timers]);

  // Toggle (pause/resume) a timer
  const toggleTimer = (id: number) => {
    // TODO: flip the `running` value for this timer
  };

  // Reset all timers
  const resetTimers = () => {
    // TODO: set all counts back to 0
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <TouchableOpacity onPress={addTimer} className="bg-blue-500 px-4 py-2 rounded-md mb-4">
        <Text className="text-white font-bold">Add Timer</Text>
      </TouchableOpacity>

      <FlatList
        data={timers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between w-64 mb-3 p-3 border rounded-md">
            <Text className="text-lg font-bold">Timer {item.id}</Text>
            <Text className="text-lg">{item.count}</Text>
            <TouchableOpacity onPress={() => toggleTimer(item.id)}>
              <Text className="text-blue-600 font-bold">
                {item.running ? "Pause" : "Resume"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity onPress={resetTimers} className="bg-red-500 px-4 py-2 rounded-md mt-4">
        <Text className="text-white font-bold">Reset All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EXAMPLE;
