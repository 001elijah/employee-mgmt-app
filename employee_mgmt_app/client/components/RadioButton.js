import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const RadioButton = ({ radioButtonData, onPress }) => {
  const { id, label, value, selected } = radioButtonData;
  return (
    <TouchableOpacity
      className="mr-4 flex-row items-center gap-x-2"
      onPress={() => onPress(radioButtonData)}
    >
      <View
        className={`h-6 w-6 rounded-full border-2 ${
          selected ? "border-sky-600" : "border-cyan-700/[.16]"
        } items-center justify-center`}
      >
        {selected ? (
          <View className="h-[14px] w-[14px] rounded-full bg-sky-600" />
        ) : null}
      </View>
      <Text className="text-xs text-cyan-700">{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
