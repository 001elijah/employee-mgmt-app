// TimeItem.js
import React from "react";
import { View, Text } from "react-native";

const TimeItem = ({ timeIn, timeOut, date, status }) => {
  return (
    <View className="flex-row border-b bg-white">
      <View className="flex-1 p-2 border">
        <Text className="text-center">{timeIn}</Text>
      </View>
      <View className="flex-1 p-2 border">
        <Text className="text-center">{timeOut}</Text>
      </View>
      <View className="flex-1 p-2 border">
        <Text className="text-center">{date}</Text>
      </View>
      <View className="flex-1 p-2 border">
        <Text className="text-center">{status}</Text>
      </View>
    </View>
  );
};

export default TimeItem;
