import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import GoBack from "../components/GoBack";
import DashboardCard from "../components/DashboardCard";

const userManagementItems = [
  {
    id: 1,
    label: "Add Employee",
    screen: "AddEmployeeScreen",
    icon: "user-plus",
  },
  {
    id: 2,
    label: "Delete Employee",
    screen: "AddEmployeeScreen",
    icon: "user-times",
  },
];

const UserManagementScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="mb-24">
      <View className="flex-row mt-10 mb-4 justify-center ">
        <GoBack />
        <Text className="text-black font-bold text-4xl tracking-wider pl-4 ">
          User Management
        </Text>
      </View>
      <View className="flex-row flex-wrap justify-center">
        {userManagementItems.map((item) => (
          <DashboardCard
            key={item.id}
            icon={item.icon}
            label={item.label}
            screen={item.screen}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default UserManagementScreen;
