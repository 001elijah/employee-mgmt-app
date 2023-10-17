import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GoBack = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} className="z-10">
      <Ionicons name="chevron-back-outline" size={40} color="black" />
    </TouchableOpacity>
  );
};

export default GoBack;
