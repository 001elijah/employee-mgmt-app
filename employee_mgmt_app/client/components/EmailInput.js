import React from "react";
import { Text, TextInput, View } from "react-native";

const EmailInput = ({
  values,
  onChangeText,
  onEndEditing,
  errors,
  touched,
}) => {
  return (
    <View className="w-full">
      <TextInput
        className="h-14 mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
        value={values.email}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        blurOnSubmit={true}
        maxLength={320}
        autoCapitalize="none"
        placeholder="E-mail"
        inputMode="email"
        //selectTextOnFocus={true}
        fontSize={16}
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
  );
};

export default EmailInput;
