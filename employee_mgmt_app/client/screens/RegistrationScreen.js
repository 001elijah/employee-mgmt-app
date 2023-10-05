import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/operations/authOperations";
import {
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { registrationValidationSchema } from "../utils/validationSchemas";
import NameInput from "../components/NameInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleRegistrationSubmit = (values) => {
    Keyboard.dismiss();

    const newUserData = {
      username: values.fullName.replace(/\s+/g, " ").trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      role: "admin",
    };
    dispatch(registerUser(newUserData));

    navigation.replace("RegistrationScreen");
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
                <NameInput
                  values={values}
                  onChangeText={handleChange("fullName")}
                  onEndEditing={handleBlur("fullName")}
                  errors={errors}
                  touched={touched}
                />
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
