import React from "react";
import { FlatList, View } from "react-native";
import PopularCard from "./Popular";
import RecentCard from "./Recent";
import SectionHeader from "./SectionHeader";

type Props = {
  sectionName: string;
  popular: any[];
  mostPopular: any[];
  recentItems: any[];
};

const RenderSection = ({ sectionName, popular, mostPopular, recentItems }: Props) => {
  switch (sectionName) {
    case "Popular Resturant":
      return (
        <View className="mb-6">
          <SectionHeader title={sectionName} />
          <FlatList
            data={popular}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PopularCard item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );

    case "Most Popular":
      return (
        <View className="mb-6">
          <SectionHeader title={sectionName} />
          <FlatList
            data={mostPopular}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PopularCard item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );

    case "Recent Items":
      return (
        <View className="mb-6">
          <SectionHeader title={sectionName} />
          <FlatList
            data={recentItems}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RecentCard item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );

    default:
      return null;
  }
};

export default RenderSection;
