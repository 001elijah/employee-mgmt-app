import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";

const CalendarScreen = () => {
  return (
    <View>
      <Text>CalendarScreen</Text>

        <TouchableOpacity 
        className="mt-[40px] left-72 bottom-4 w-11 h-11 bg-[#4D91D5] rounded-full items-center justify-center"
        onPress={() => console.log("test")}>
          <Text className="font-semibold text-3xl text-white">{"J"}</Text>  
        </TouchableOpacity>

     
    </View>
  );
};

export default CalendarScreen;
