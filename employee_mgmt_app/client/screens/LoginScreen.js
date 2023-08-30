import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useState } from "react";

const LoginScreen = ({ navigation }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLoginAttempt = async () => {
    Keyboard.dismiss();
  };

  return (
    <View className="flex-1 items-center justify-center bg-grey">
      <Text className="text-black text-4xl right-20 bottom-40 font-bold">
        Login
      </Text>
      <Text className="text-gray-500 text-xl right-12 bottom-5">
        Sign in to your account
      </Text>

      <TextInput
        className="h-14 w-4/5 mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
        value={loginEmail}
        onChangeText={setLoginEmail}
        placeholder="Example@luday.se"
        blurOnSubmit={true}
      ></TextInput>

      <TextInput
        className="h-14 w-4/5 mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
        secureTextEntry={showPassword}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        blurOnSubmit={true}
      ></TextInput>

      <View className="mt-3 w-4/5">
        <Button
          onPress={() => navigation.navigate("HomeScreen")}
          title="Login"
        />
      </View>

      <Text className="text-sky-600 right-15 mt-4">Forgot password?</Text>

      <Text className="text-sky-600 right-15 top-40">
        Dont have an account? Join Us
      </Text>
    </View>
  );
};

export default LoginScreen;
