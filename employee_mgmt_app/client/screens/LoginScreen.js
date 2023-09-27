import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { loginUser } from "../redux/operations/authOperations";
import EyeIcon from "../assets/icons/EyeIcon";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  StatusBar,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => setHidePassword(!hidePassword);

  const handleLoginAttempt = async () => {
    Keyboard.dismiss();

    setEmailInput(emailInput.trim());

    const tempEmail = emailInput.toLowerCase();
    const loginEmail = tempEmail.trim();

    const firstChar = loginEmail[0];
    const lastChar = loginEmail[loginEmail.length - 1];

    const email_controller = /^([A-Za-z0-9.@_+-]{4,254})$/.test(loginEmail);
    const email_controller2 = /^([A-Za-z0-9]{1,1})$/.test(firstChar);
    const email_controller3 = /^([A-Za-z0-9]{1,1})$/.test(lastChar);

    if (loginEmail.length === 0 && password.length === 0) { Alert.alert("Message", "Please enter your login credentials"); } 
    
    else if (loginEmail.length === 0) { Alert.alert("Message", "Please enter your e-mail adress"); } 
    
    else if (!loginEmail.includes("@") || !loginEmail.includes(".") || loginEmail.includes(" ") || !email_controller || !email_controller2 || !email_controller3) 
    {
      Alert.alert("Message", "E-mail adress not valid. Please check if it is written correctly");
    } 
    else 
    {
      if (password.length === 0) { Alert.alert("Message", "Please enter your password"); } 
      else 
      {
        const loginData = { email: loginEmail, password: password };
        dispatch(loginUser(loginData));
        //setEmailInput("");
        //setPassword("");
      }
    }
  };

  const handlePasswordReset = async () => {
    Keyboard.dismiss();
    Alert.alert("Message", "Password reset");
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-5 flex-1 justify-start items-start bottom-1">
          <Text className="right-px shrink mt-40 mb-16 w-48 text-3xl font-bold text-4xl">
            Login
          </Text>

          <Text className="shrink mb-8 mt-4 w-full text-2xl text-slate-400">
            Sign in to your account
          </Text>

          <TextInput
            className="h-14 w-full mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
            value={emailInput}
            onChangeText={setEmailInput}
            autoCapitalize="none"
            placeholder="Example@luday.se"
            blurOnSubmit={true}
          />

          <View className="w-full">
            <TextInput
              className="h-14 mb-20 pl-6 pr-11 border border-cyan-700/[.16] rounded-xl text-cyan-700"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              placeholder="Password"
              blurOnSubmit={true}
              secureTextEntry={hidePassword}
            />

            <TouchableOpacity
              className="absolute items-center justify-center h-12 w-9 top-1 right-1"
              activeOpacity={0.5}
              onPress={toggleHidePassword}
            >
              <EyeIcon />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bottom-10 flex-2 items-center justify-center w-full h-14 bg-sky-600 rounded-xl"
            onPress={handleLoginAttempt}
          >
            <Text className="text-white text-xl font-medium">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mx-auto bg-transparent bottom-4"
            onPress={handlePasswordReset}
          >
            <Text className="text-sky-600 text-lg text-base">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mx-auto bg-transparent mt-5 mt-14"
            onPress={() => navigation.navigate("RegistrationScreen")}
          >
            <Text className="text-sky-600 text-lg text-base mt-7">
              Don't have an account? Join us
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
