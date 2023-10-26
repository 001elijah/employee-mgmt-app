import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const DocumentItem = ({ icon, label, info1, info2, screen }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen)}
      className="flex-col  w-40 h-40 items-center p-3 bg-[#F1F288] rounded-3xl justify-around m-2 shadow-md shadow-black m "
    >
      <Icon name={icon} size={60} color="#4D91D5" />
      <Text className="text-[#4D91D5] text-xl font-semibold text-center ">
        {label}
      </Text>

      <View className="flex-row justify-between items-center ">
        <Text className="text-md font-semibold px-3 text-[#4D91D5] flex-1 text-right">
          {info1}
        </Text>

        <View className="border-r border-[#4D91D5] h-[80%] "></View>

        <Text className="text-md font-semibold px-3 text-[#4D91D5] flex-1">
          {info2}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentItem;
