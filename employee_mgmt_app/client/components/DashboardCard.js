import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

function DashboardCard({ icon, label, screen }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen)}
      className="flex-col w-44 h-44 items-center p-6 bg-[#4D91D5] rounded-3xl justify-around mx-2 my-2 shadow-md shadow-black "
    >
      <Icon name={icon} size={60} color="white" />
      <Text className="text-white text-xl font-semibold text-center ">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default DashboardCard;
