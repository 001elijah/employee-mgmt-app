import * as React from "react";
import { Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <>
      <View className="w-full h-[357px] items-center rounded-b-[30px] bg-[#2578CC]">
        <View className="w-1/2 h-10 mt-[57px] items-center justify-center rounded-full bg-white h-36 w-36">
          <Text className="font-semibold text-7xl color-gray-400 top-1">J</Text>
        </View>
        <Text className="mt-[28px] text-3xl font-semibold text-[#FFF]">
          John
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
            <Text className="text-xl font-light text-[#677294]">John Doe</Text>
          </View>
          <View className="mb-3.5">
            <Text className="font-semibold text-xl text-[#2578CC]">
              Contact Number
            </Text>
            <Text className="text-xl font-light text-[#677294]">
              +000000000000
            </Text>
          </View>
          <View className="mb-3.5">
            <Text className="font-semibold text-xl text-[#2578CC]">
              Date of Birth
            </Text>
            <Text className="text-xl font-light text-[#677294]">
              20 01 1999
            </Text>
          </View>
          <View>
            <Text className="font-semibold text-xl text-[#2578CC]">Role</Text>
            <Text className="text-xl font-light text-[#677294]">Admin</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
