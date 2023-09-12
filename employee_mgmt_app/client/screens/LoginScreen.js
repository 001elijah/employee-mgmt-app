import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TouchableOpacity, Text,
  TextInput, View,
  TouchableWithoutFeedback, Keyboard,
  Alert, StatusBar,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import EyeIcon from "../assets/icons/EyeIcon";

import { loginUser } from "../redux/operations/authOperations";








const LoginScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => setHidePassword(!hidePassword);

  const handleLoginAttempt = async () => 
  {
    Keyboard.dismiss();

    console.log("Login attempt...");

    const email_controller = /^([A-Za-z0-9.@_-]{4,254})$/.test(loginEmail);

    console.log("Email controller status:  " + email_controller);
    
    console.log("Recieved e-mail: " + loginEmail);

    //const newLoginEmail = loginEmail.toLowerCase();

    //console.log("Recieved e-mail: " + newLoginEmail + " " + "(Length: " + newLoginEmail.length + ")");
  
    if (loginEmail.length === 0 && password.length === 0) { Alert.alert('Message', 'Please enter your login credentials'); }
    
    else if (loginEmail.length === 0) { Alert.alert('Message', 'Please enter your e-mail adress'); }

    else if (!loginEmail.includes("@")) { Alert.alert('Message', 'Valid e-mail must include an at sign (@)'); }

    else if (!loginEmail.includes(".")) { Alert.alert('Message', 'E-mail should include one or more dots'); }

    else if (loginEmail.includes(" ")) { Alert.alert('Message', 'E-mail must not include spaces'); }

    else if (email_controller === false) { Alert.alert('Message', 'E-mail adress not valid. Please check if it is written correctly'); }

    else if (email_controller === true)
    {
      console.log("E-mail was approved, checking password...");

      if (password.length === 0) { Alert.alert('Message', 'Please enter your password'); }

      else if (password.length < 8) { Alert.alert('Message', 'Your app password should consist of 8 characters or more'); }

      else if (password.length >= 8)
      {

        console.log("Checking database....");

        handleLoginSubmit();

      }

      else { Alert.alert('Message', 'Wrong e-mail or password'); }
    } 
 };

  const handlePasswordReset = async () => 
  {
    Keyboard.dismiss();
    Alert.alert('Message', 'Password reset');
  };


  



  const handleLoginSubmit = async () => {
    
    console.log("Submitting to database...");

    const loginData = 
    {
      email: loginEmail,
      password: password,
    };
  
    dispatch(loginUser(loginData));
  
    //setLoginEmail("");
    //setPassword("");
  
    //navigation.replace("HomeScreen");
  };




  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View className="px-5 flex-1 justify-start items-start bottom-1">

          <Text className="right-px shrink mt-40 mb-16 w-48 text-3xl font-bold text-4xl">Login</Text>

          <Text className="shrink mb-8 mt-4 w-full text-2xl text-slate-400">Sign in to your account</Text>

          <TextInput
            className="h-14 w-full mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
            value={loginEmail}
            onChangeText={setLoginEmail}
            placeholder="Example@luday.se"
            blurOnSubmit={true}
          />

          <View className="w-full">
            
            <TextInput
              className="h-14 mb-20 pl-6 pr-11 border border-cyan-700/[.16] rounded-xl text-cyan-700"
              value={password}
              onChangeText={setPassword}
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


          <TouchableOpacity className="bottom-10 flex-2 items-center justify-center w-full h-14 bg-sky-600 rounded-xl" onPress={handleLoginAttempt}>
            <Text className="text-white text-xl font-medium">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mx-auto bg-transparent bottom-4" onPress={handlePasswordReset}>    
            <Text className="text-sky-600 text-lg text-base">Forgot Password?</Text>
          </TouchableOpacity>


          <TouchableOpacity className="mx-auto bg-transparent mt-5 mt-14" onPress={() => navigation.navigate("RegistrationScreen")}>
            <Text className="text-sky-600 text-lg text-base mt-7">Don't have an account? Join us</Text>
          </TouchableOpacity>

        </View>

      </TouchableWithoutFeedback>

    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
