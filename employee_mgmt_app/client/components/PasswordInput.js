import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import EyeOffIcon from "../assets/icons/EyeOffIcon";
import EyeOnIcon from "../assets/icons/EyeOnIcon";

const PasswordInput = ({
  values,
  onChangeText,
  onEndEditing,
  errors,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <View className="w-full">
      <TextInput
        className="h-14 mb-4 pl-6 pr-11 border border-cyan-700/[.16] rounded-xl text-cyan-700"
        value={values.password}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        autoCapitalize="none"
        placeholder="Password"
        blurOnSubmit={true}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        className="absolute items-center justify-center h-12 w-9 top-1 right-1"
        activeOpacity={0.5}
        onPress={toggleShowPassword}
      >
        {showPassword ? <EyeOffIcon /> : <EyeOnIcon />}
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
  );
};

export default PasswordInput;
