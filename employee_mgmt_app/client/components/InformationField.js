import React from "react";
import { View, Text } from "react-native";

function InformationField({ title, value }) {
  return (
    <View className="mb-3.5 border-b border-gray-300 py-2 ">
      <Text className="font-semibold text-xl text-[#2578CC] mb-1">{title}</Text>
      <Text className="text-xl font-light text-[#677294]">{value}</Text>
    </View>
  );
}

export default InformationField;
