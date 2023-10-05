import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { loginUser } from "../redux/operations/authOperations";
import EyeIcon from "../assets/icons/EyeIcon";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  TouchableOpacity, Text,
  TextInput, View,
  TouchableWithoutFeedback,
  Keyboard, Alert, StatusBar,
} from "react-native";

import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

const validEmailCheck = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;

const loginValidation = yup.object().shape({
  email: yup
    .string()
    .matches(validEmailCheck, "E-mail address not valid")
    .required("E-mail address is required"),
    
    password: yup
    .string()
    .required("Password is required"),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => setHidePassword(!hidePassword);

  const handleLoginAttempt = (values) => {
    Keyboard.dismiss();

    const loginData = { email: values.email.toLowerCase().trim(), password: values.password };
    
    dispatch(loginUser(loginData));
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
          <Text className="right-px shrink mt-40 mb-16 w-48 text-3xl font-bold text-4xl">Login </Text>

          <Text className="shrink mb-8 mt-4 w-full text-2xl text-slate-400">Sign in to your account </Text>

          <Formik
            validationSchema={loginValidation}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => handleLoginAttempt(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isValid,
            }) => (
              <>
                <EmailInput
                  values={values}
                  onChangeText={handleChange("email")}
                  onEndEditing={handleBlur("email")}
                  errors={errors}
                  touched={touched}
                />
                <PasswordInput
                  values={values}
                  onChangeText={handleChange("password")}
                  onEndEditing={handleBlur("password")}
                  errors={errors}
                  touched={touched}
                />
                <TouchableOpacity
                  className={`flex-2 items-center justify-center w-full h-14 ${
                    isValid &&
                    values.email.trim().length !== 0 &&
                    values.password.trim().length !== 0
                      ? "bg-sky-600"
                      : "bg-sky-200"
                  } rounded-xl`}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  >
                  <Text className="text-white text-lg font-medium">Login</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <TouchableOpacity
            className="mx-auto bg-transparent bottom-4"
            onPress={handlePasswordReset}
          >
            <Text className="text-sky-600 text-lg text-base mt-8">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mx-auto bg-transparent mt-5 mt-14"
            onPress={() => navigation.navigate("RegistrationScreen")}
          >
            <Text className="text-sky-600 text-lg text-base mt-4">Don't have an account? Join us</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
