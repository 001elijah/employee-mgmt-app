import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import HistoryScreen from "./HistoryScreen";
import AddEmployeeScreen from "./AddEmployeeScreen";
import HomeIcon from "../assets/icons/HomeIcon";
import BookIcon from "../assets/icons/BookIcon";
import MessageIcon from "../assets/icons/MessageIcon";
import DashboardScreen from "./DashboardScreen";
import { Platform, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectIsAuth, selectUserRole } from "../redux/selectors/authSelectors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserManagementScreen from "./UserManagementScreen";
import TimeTrackerScreen from "./TimeTrackerScreen";
import CalendarScreen from "./CalendarScreen";
import ReportScreen from "./ReportScreen";
import UploadDocsScreen from "./UploadDocsScreen";
import PaymentSystemScreen from "./PaymentSystemScreen";
import { NavigationContainer } from "@react-navigation/native";
import AddDocsScreen from "./AddDocsScreen";
import PreviewDocsScreen from "./PreviewDocsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ManageDocsTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={"UploadDocsScreen"}
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS !== "ios",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#858EA9",
        tabBarStyle: {
          position: "absolute",
          height: 84,
          paddingTop: 3,
          alignItems: "center",
          justifyContent: "space-around",
          border: "none",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#FFF",
        },
      }}
    >
      <Tab.Screen name="UploadDocsScreen" component={UploadDocsScreen} />
      <Tab.Screen name="AddDocsScreen" component={AddDocsScreen} />
      <Tab.Screen name="PreviewDocsScreen" component={PreviewDocsScreen} />
    </Tab.Navigator>
  );
};

export const EmployeeManagementStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="UserManagementScreen"
        component={UserManagementScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="AddEmployeeScreen"
        component={AddEmployeeScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const Home = ({ navigation }) => {
  const isAuthorized = useSelector(selectIsAuth);
  const role_id = useSelector(selectUserRole);

  useEffect(() => {
    !isAuthorized && navigation.replace("Auth");
  }, [isAuthorized]);
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          animation: "none",
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
        ></Stack.Screen>
        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
        <Stack.Screen
          animationEnabled={false}
          name="EmployeeManagementStack"
          component={EmployeeManagementStack}
        ></Stack.Screen>
        <Stack.Screen
          name="TimeTrackerScreen"
          component={TimeTrackerScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ReportScreen"
          component={ReportScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="UploadDocsScreen"
          component={ManageDocsTabs}
        ></Stack.Screen>
        <Stack.Screen
          name="PaymentSystemScreen"
          component={PaymentSystemScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default Home;
