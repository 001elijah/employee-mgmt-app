import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/operations/authOperations";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import EyeIcon from "../assets/icons/EyeIcon";

const registrationValidationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please enter valid email")
    .required("Email Address is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      "Must Contain 6 Characters, One Number",
    )
    .min(7, ({ min }) => `Password must be minimum ${min} symbols`)
    .required("Password is required"),
});

const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleRegistrationSubmit = (values) => {
    Keyboard.dismiss();
    const newUserData = {
      username: values.fullName.trim().toLowerCase(),
      email: values.email.trim().toLowerCase(),
      password: values.password.trim().toLowerCase(),
      role: "admin",
    };
    dispatch(registerUser(newUserData));
    setFullName("");
    setEmail("");
    setPassword("");
    navigation.replace("LoginScreen");
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-5 flex-1 justify-start items-start bottom-4">
          <Text className="shrink mt-48 mb-14 w-48 text-4xl font-medium">
            Employer Registration
          </Text>
          <Text className="shrink mb-8 w-full text-xl text-slate-400">
            Create an account as an <Text className="underline">employer</Text>
          </Text>
          <Formik
            validationSchema={registrationValidationSchema}
            initialValues={{ fullName: "", email: "", password: "" }}
            onSubmit={(values) => handleRegistrationSubmit(values)}
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
                <View className="w-full">
                  <TextInput
                    className="h-14 mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
                    value={values.fullName}
                    onChangeText={handleChange("fullName")}
                    onEndEditing={handleBlur("fullName")}
                    placeholder="Full name"
                    blurOnSubmit={true}
                  />
                  {errors.fullName && touched.fullName && (
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 20,
                        left: 25,
                        fontSize: 10,
                        color: "red",
                      }}
                    >
                      {errors.fullName}
                    </Text>
                  )}
                </View>
                <View className="w-full">
                  <TextInput
                    className="h-14 mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onEndEditing={handleBlur("email")}
                    autoCapitalize="none"
                    placeholder="Email"
                    blurOnSubmit={true}
                  />
                  {errors.email && touched.email && (
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 21,
                        left: 25,
                        fontSize: 10,
                        color: "red",
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View className="w-full">
                  <TextInput
                    className="h-14 mb-20 pl-6 pr-11 border border-cyan-700/[.16] rounded-xl text-cyan-700"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onEndEditing={handleBlur("password")}
                    autoCapitalize="none"
                    placeholder="Password"
                    blurOnSubmit={true}
                    secureTextEntry={showPassword}
                  />
                  <TouchableOpacity
                    className="absolute items-center justify-center h-12 w-9 top-1 right-1"
                    activeOpacity={0.5}
                    onPress={toggleShowPassword}
                  >
                    <EyeIcon />
                  </TouchableOpacity>
                  {errors.password && touched.password && (
                    <Text
                      style={{
                        position: "absolute",
                        top: 37,
                        left: 25,
                        fontSize: 10,
                        color: "red",
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  className={`flex-2 items-center justify-center w-full h-14 ${
                    isValid &&
                    values.fullName.trim().length !== 0 &&
                    values.email.trim().length !== 0 &&
                    values.password.trim().length !== 0
                      ? "bg-sky-600"
                      : "bg-sky-200"
                  } rounded-xl`}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text className="text-white text-lg font-medium">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <TouchableOpacity
            className="mx-auto bg-transparent mt-5"
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text className="text-sky-600 text-lg text-base">
              Have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default RegistrationScreen;
