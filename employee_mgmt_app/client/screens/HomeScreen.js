import * as React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import {
  selectEmail,
  selectUserName,
  selectUserRole,
} from "../redux/selectors/authSelectors";
import InformationField from "../components/InformationField";
import GoBack from "../components/GoBack";
import { capitalize } from "../utils/capitalize";
import HandleLogout from "../components/HandleLogout";

const displayrole = (role_id) => 
{
  if (role_id === 0) { return "n/a"; }
  else if (role_id === 1) { return "Staff member"; } 
  else if (role_id === 2) { return "Sub-admin"; } 
  else if (role_id === 3) { return "Administrator"; } 
};

const HomeScreen = () => {
  const full_name = useSelector(selectUserName);
  const email = useSelector(selectEmail);
  const role_id = useSelector(selectUserRole);

  return (
    <>
      <View className="w-full items-center ">
        <View className="absolute top-[55px] left-[20px]">
          <GoBack />
        </View>

        <Text className="mt-[60px] text-2xl font-semibold text-black text-center w-full">
          Personal information
        </Text>

        <View className="mt-[50px] w-36 h-36 bg-[#4D91D5] rounded-full items-center justify-center shadow-md shadow-black">
          <Text className="font-semibold text-6xl text-white">
            {full_name ? capitalize(full_name.charAt(0)) : ""}
          </Text>
        </View>
      </View>

      <View className="mt-4 px-4">
        <InformationField title="Full name" value={full_name} />
        <InformationField title="Email" value={email} />
        <InformationField title="Role" value={displayrole(role_id)} />
        <InformationField title="Company" value="" />
      </View>
    </>
  );
};

export default HomeScreen;
