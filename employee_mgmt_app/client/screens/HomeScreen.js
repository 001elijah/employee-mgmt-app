import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/operations/authOperations";
import {
  selectEmail,
  selectToken,
  selectUserName,
  selectUserRole,
} from "../redux/selectors/authSelectors";
import SignoutIcon from "../assets/icons/SignoutIcon";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const name = useSelector(selectUserName);
  const email = useSelector(selectEmail);
  const role = useSelector(selectUserRole);

  const handleLogout = () => {
    if (token) dispatch(logoutUser());
  };

  return (
    <>
      <View className="w-full h-[357px] items-center rounded-b-[30px] bg-[#2578CC]">
        <TouchableOpacity
          className="mt-[61px] ml-[20px] mr-auto flex-row"
          activeOpacity={0.5}
          onPress={handleLogout}
        >
          <SignoutIcon />
          <Text className="ml-1 text-white text-xs font-medium">sign out</Text>
        </TouchableOpacity>
        <View className="w-1/2 h-10 items-center justify-center rounded-full bg-white h-36 w-36">
          <Text className="font-semibold text-7xl color-gray-400 top-1">
            {name?.charAt(0)}
          </Text>
        </View>
        <Text className="mt-[28px] text-3xl font-semibold text-[#FFF]">
          {name}
        </Text>
      </View>

      <View className="mt-4 px-4">
        <View className="items-center justify-center">
          <Text className="font-semibold text-xl">Personal information</Text>
        </View>

        <View className="mt-[30px]">
          <View className="mb-3.5">
            <Text className="font-semibold text-xl text-[#2578CC]">
              Full Name
            </Text>
            <Text className="text-xl font-light text-[#677294]">{name}</Text>
          </View>
          <View className="mb-3.5">
            <Text className="font-semibold text-xl text-[#2578CC]">Email</Text>
            <Text className="text-xl font-light text-[#677294]">{email}</Text>
          </View>
          <View>
            <Text className="font-semibold text-xl text-[#2578CC]">Role</Text>
            <Text className="text-xl font-light text-[#677294]">{role}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
