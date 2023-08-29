import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleRegistrationSubmit = async () => {
    Keyboard.dismiss();
    console.log("sumbit");
    // navigation.replace("LoginScreen");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-5 flex-1 justify-start items-start">
          <Text className="mt-48 mb-14 w-48 text-3xl">
            Employer Registration
          </Text>
          <TextInput
            className="h-14 w-full mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full name"
            blurOnSubmit={true}
          />
          <TextInput
            className="h-14 w-full mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            blurOnSubmit={true}
          />
          <View className="w-full">
            <TextInput
              className="h-14 mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              blurOnSubmit={true}
              secureTextEntry={showPassword}
            />
            {showPassword ? (
              <TouchableOpacity
                className="absolute top-5 right-4"
                activeOpacity={0.5}
                onPress={toggleShowPassword}
              >
                <Text>Show</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="absolute top-5 right-4"
                activeOpacity={0.5}
                onPress={toggleShowPassword}
              >
                <Text>Hide</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            className="flex-2 items-center justify-center w-full h-14 mt-14 bg-sky-600 rounded-xl"
            onPress={handleRegistrationSubmit}
          >
            <Text className="text-white text-lg font-medium">Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-auto bg-transparent mt-5"
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text className="text-sky-600 text-lg font-medium">
              Have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
