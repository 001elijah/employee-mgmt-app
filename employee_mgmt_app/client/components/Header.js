import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GoBack from "./GoBack";
import { selectUserName } from "../redux/selectors/authSelectors";
import { capitalize } from "../utils/capitalize";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";

const Header = ({ title, avatarbg }) => {
  const name = useSelector(selectUserName);
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between mt-8 mx-5 mb-3">
      <GoBack color="white" />
      <Text className="text-3xl text-white">{title}</Text>
      <TouchableOpacity
        className={`w-12 h-12 ${avatarbg} rounded-full items-center justify-center shadow-md shadow-black`}
        onPress={() => navigation.navigate(HomeScreen)}
      >
        <Text className="font-semibold text-3xl text-white">
          {name ? capitalize(name.charAt(0)) : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
