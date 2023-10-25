import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ClockButton = ({
  isClockedIn,
  handleAction,
  iconName,
  label,
  bgColor,
  addStyles,
  disabledCondition,
  time,
  clockInReadable,
}) => {
  const Styles = `rounded-[30px] h-52 flex-col items-center w-1/2 justify-around m-2 ${addStyles}`;
  const activeStyles = disabledCondition ? `opacity-40 ${Styles}` : Styles;

  return (
    <TouchableOpacity
      disabled={disabledCondition}
      className={`${activeStyles} ${bgColor}`}
      onPress={handleAction}
    >
      <View className="flex flex-col items-center">
        <Ionicons name={iconName} size={80} color="white" />
        <Text className="text-white text-3xl font-semibold text-center">
          {label}
        </Text>
      </View>
      <View className="">
        <Text className="text-white text-2xl text-center">
          {disabledCondition ? clockInReadable.slice(0, 5) : time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ClockButton;
