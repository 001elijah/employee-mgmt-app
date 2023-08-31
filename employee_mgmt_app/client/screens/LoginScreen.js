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
  const [password, setPassword] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => setHidePassword(!hidePassword);

  const handleLoginAttempt = async () => 
  {
    Keyboard.dismiss();

    console.log("Login attempt...");

    const email_controller = /^([A-Za-z0-9.@]{4,254})$/.test(loginEmail);

    //approve e-mail input
    if(email_controller && loginEmail.includes("@") && loginEmail.includes("."))
    {
      //approve password input
      if(password != "")
      {
        //Valid user input, verify email and password with database
        navigation.navigate("HomeScreen");
      }

      else { console.log("Login attempt failed: password field is empty"); }
    }

    else { console.log("Login attempt failed: Not a valid e-mail adress"); }

    setLoginEmail("");
    setPassword("");
  };

  return (
    <View className="flex-1 items-center justify-center bg-grey">
      <Text className="text-black text-4xl right-20 bottom-40 font-bold">Login</Text>
      <Text className="text-gray-500 text-xl right-12 bottom-5">Sign in to your account</Text>
     

          <TextInput
            className="h-14 w-4/5 mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
            value={loginEmail}
            onChangeText={setLoginEmail}
            placeholder="Example@luday.se"
            blurOnSubmit={true}>
          </TextInput>

          <View className="w-4/5">
            <TextInput
              className="h-14 mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
              secureTextEntry={hidePassword}
              value={password}
              onChangeText={setPassword} 
              placeholder="Password"
              blurOnSubmit={true}
            />

            {hidePassword ? (
              <TouchableOpacity
                className="absolute top-5 right-4"
                activeOpacity={0.5}
                onPress={toggleHidePassword}
              >
                <Text>Show</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="absolute top-5 right-4"
                activeOpacity={0.5}
                onPress={toggleHidePassword}
              >
                <Text>Hide</Text>
              </TouchableOpacity>
            )}
          </View>   

        <TouchableOpacity
            className="flex-2 items-center justify-center w-4/5 h-11 mt-3 bg-sky-600 rounded-xl"
            onPress={handleLoginAttempt}>
            <Text className="text-white text-lg font-medium">Login</Text>
        </TouchableOpacity>

      <Text className="text-sky-600 right-15 mt-4">Forgot password?</Text>

      <Text onPress={() => navigation.navigate("RegistrationScreen")} className="text-sky-600 right-15 top-40" >Dont have an account? Join Us</Text>

    </View>
  );
};

export default LoginScreen;
