import {
  TouchableOpacity, Text,
  TextInput, View,
  Button, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback,
  Keyboard, Alert, StatusBar
} from "react-native";
import EyeIcon from "../assets/icons/EyeIcon";

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

    //const password_controller = /^([A-Za-z0-9.@_{}-+]{8,65})$/.test(password);
    //console.log("Password controller:  " + password_controller);
  
    const email_controller = /^([A-Za-z0-9.@_-]{4,254})$/.test(loginEmail);

    console.log("Email controller status:  " + email_controller);
    
    console.log("Recieved e-mail: " + loginEmail);
   
    if (loginEmail.length === 0)
    {
      Alert.alert('Message', 'Please enter your e-mail adress'); 
    }

    else if (!loginEmail.includes("@"))
    {
      Alert.alert('Message', 'Valid e-mail must include an at sign (@)');
    }

    else if (!loginEmail.includes("."))
    {
      Alert.alert('Message', 'E-mail must include one or more dots (.)');
    }

    else if (loginEmail.includes(" "))
    {
      Alert.alert('Message', 'E-mail must not include spaces');
    }

    else if (email_controller === false)
    {
      Alert.alert('Message', 'E-mail adress not valid. Please check if it is written correctly');
    }

    else if (email_controller === true)
    {
      console.log("E-mail was approved, checking password...");

      if (password.length === 0)
      {
        Alert.alert('Message', 'Please enter your password');
      }

      else if (password.length < 8)
      {
        Alert.alert('Message', 'Your app password should be 8 should be characters or more');
      }

      else if (password.length >= 8 && password == "Password")
      {
        console.log("Checking database....");
        navigation.navigate("HomeScreen");
        setLoginEmail("");
        setPassword("");
      }

      else
      {
        Alert.alert('Message', 'Wrong e-mail or password');
      }
    } 
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
                <EyeIcon />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="absolute top-5 right-4"
                activeOpacity={0.5}
                onPress={toggleHidePassword}
              >
                <Text>Display</Text>
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
