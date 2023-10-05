import React from "react";
import { Text, TextInput, View } from "react-native";

const NameInput = ({ values, onChangeText, onEndEditing, errors, touched }) => {
  return (
    <View className="w-full">
      <TextInput
        className="h-14 mb-4 px-6 border border-cyan-700/[.16] rounded-xl text-cyan-700"
        value={values.fullName}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        placeholder="Full name"
        blurOnSubmit={true}
        autoCapitalize="words"
        maxLength={350}
        fontSize={16}
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
  );
};

export default NameInput;
