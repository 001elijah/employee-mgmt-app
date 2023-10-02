import { View } from "react-native";
import React from "react";
import RadioButton from "./RadioButton";

const RadioButtonGroup = ({ data, onPress, styling }) => {
  return (
    <View className={`flex-row flex-wrap ${styling}`}>
      {data.map((radioButtonData) => (
        <RadioButton
          key={radioButtonData.id}
          radioButtonData={radioButtonData}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

export default RadioButtonGroup;
