import { Text, TextInput, View, Alert, Keyboard, StatusBar } from "react-native";

const startImageUpload = async () => 
  {
    Keyboard.dismiss();

    console.log("Upload button pressed...");

    Alert.alert('Message', 'Upload');
  };

const HomeScreen = () => {
  return (
    <View className="bg-gray-50">

      <StatusBar translucent backgroundColor="transparent"/>

      <View className="bg-sky-500 w-full object-top h-80 rounded-l-lg rounded-r-lg">


        <View className="items-center justify-center w-1/2 h-10 rounded-full bg-white h-36 w-36 top-20 left-28">
          <Text className="font-semibold text-4xl color-gray-400">Image</Text>
        </View>

        <View className="opacity-80 bg-gray-400 items-center justify-center w-1/2 h-10 rounded-full h-10 w-10 top-12 left-52">
          
          <Text onPress={startImageUpload} className="font-bold text-4xl color-white">+</Text>
        
        </View>

      </View>

     <View className="items-center justify-center my-4 mb-6">
        <Text className="font-semibold text-xl">Personal information</Text>
      </View>

      <View className="ml-5 space-y-14">
        <Text className="font-semibold text-xl text-cyan-700">Full Name</Text>
        <Text className="font-semibold text-xl text-cyan-700">Contact Number</Text>
        <Text className="font-semibold text-xl text-cyan-700">Date of Birth</Text>
        <Text className="font-semibold text-xl text-cyan-700">Role</Text>
      </View>


    </View>
  );
};

export default HomeScreen;
