import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/operations/authOperations";
import { selectToken } from "../redux/selectors/authSelectors";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HandleLogout = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const handleLogouts = () => {
    if (token) dispatch(logoutUser());
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="mr-6"
      onPress={handleLogouts}
    >
      <Icon name="sign-out" size={40} color="black" />
    </TouchableOpacity>
  );
};

export default HandleLogout;
