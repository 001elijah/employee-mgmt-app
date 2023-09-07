//import * as React from "react";
import 
{ 
  Text, TextInput, 
  View, Alert, 
  Keyboard, StatusBar 
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <StatusBar translucent backgroundColor="transparent"/>

      <View className="bg-sky-500 w-full object-top h-80 rounded-l-lg rounded-r-lg">

        <View className="items-center justify-center w-1/2 h-10 rounded-full bg-white h-36 w-36 top-20 left-28">
          <Text className="font-semibold text-7xl color-gray-400 top-1">J</Text>
        </View>
      </View>

     <View className="items-center justify-center my-4 mb-8">
        <Text className="font-semibold text-2xl">Personal information</Text>
      </View>

      <View className="ml-5 space-y-14">
        <Text className="font-semibold text-xl text-sky-600">Full Name</Text>
        <Text className="font-semibold text-xl text-sky-600">Contact Number</Text>
        <Text className="font-semibold text-xl text-sky-600">Date of Birth</Text>
        <Text className="font-semibold text-xl text-sky-600">Role</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
