import {
  Button,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const RegistrationScreen = ({ navigation }) => {
  const handleRegistrationSubmit = async () => {
    Keyboard.dismiss();
    console.log("sumbit");
    navigation.replace("LoginScreen");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-24 flex-1 justify-around">
          <Text className="text-3xl mb48">
            Employer Registration
          </Text>
          <TextInput
            className="h-40 border-black border-b-1 mb-9"
            value="{email}"
            // onChangeText={setEmail}
            placeholder="Type your email"
            blurOnSubmit={true}
          />
          <TextInput
            className="h-40 border-black border-b-1 mb-9"
            value="{fullName}"
            // onChangeText={setFullName}
            placeholder="Type your name"
            blurOnSubmit={true}
          />
          <TextInput
            className="h-40 border-black border-b-1 mb-9"
            value="{password}"
            // onChangeText={setPassword}
            placeholder="Type your password"
            blurOnSubmit={true}
          />
          <View className="bg-white mt-3">
            <Button title="register" onPress={handleRegistrationSubmit} />
          </View>
          <View className="bg-white mt-3">
            <Button
              title="go to login"
              onPress={() => navigation.navigate("LoginScreen")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
