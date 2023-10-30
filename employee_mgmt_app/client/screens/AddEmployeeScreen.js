import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { RADIO_BUTTON_GROUP_DATA } from "../utils/constants";
import RadioButtonGroup from "../components/RadioButtonGroup";
import { selectUserRole } from "../redux/selectors/authSelectors";

const AddEmployeeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const role_id = useSelector(selectUserRole);

  const [radioButtonGroupData, setRadioButtonGroupData] = useState(
    RADIO_BUTTON_GROUP_DATA,
  );
  const [radioSelected, setRadioSelected] = useState(undefined);

  const onRadioBtnClick = (item) => {
    let updatedState = radioButtonGroupData.map((radioButtonItem) => {
      if (radioButtonItem.id === item.id) {
        setRadioSelected &&
          setRadioSelected({ ...radioButtonItem, selected: true });
        return { ...radioButtonItem, selected: true };
      } else {
        return { ...radioButtonItem, selected: false };
      }
    });
    setRadioButtonGroupData(updatedState);
  };

  const handleRegistrationSubmit = (values) => {
    Keyboard.dismiss();
    const newUserData = {
      username: values.fullName.replace(/\s+/g, " ").trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      role_id: role_id === 3 ? radioSelected?.value : 1,
    };

    //console.log(newUserData);

    dispatch(registerUser(newUserData));

    navigation.replace("Home");
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-5 flex-1 justify-start items-start bottom-32">
          <Text className="shrink mt-48 mb-14 w-48 text-4xl font-medium">
            Add employee
          </Text>
          <Text className="shrink mb-8 w-full text-xl text-slate-400">
            {role_id === 3
              ? "Create accounts for your employees here"
              : "Create accounts for your employees (staff role only) here"}
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
                {role_id === 3 && (
                  <RadioButtonGroup
                    styling={"mb-8"}
                    data={radioButtonGroupData}
                    onPress={onRadioBtnClick}
                  />
                )}
                <TouchableOpacity
                  className={`${
                    role_id === 2 && "mt-8"
                  } flex-2 items-center justify-center w-full h-14 ${
                    role_id === 3
                      ? isValid && radioSelected
                      : isValid &&
                        values.fullName.trim().length !== 0 &&
                        values.email.trim().length !== 0 &&
                        values.password.trim().length !== 0
                      ? "bg-sky-600"
                      : "bg-sky-200"
                  } rounded-xl`}
                  onPress={handleSubmit}
                  disabled={!isValid || (role_id === 3 && !radioSelected)}
                >
                  <Text className="text-lg font-medium">Create</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default AddEmployeeScreen;
