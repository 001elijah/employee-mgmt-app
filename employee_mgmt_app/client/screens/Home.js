import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import HistoryScreen from "./HistoryScreen";
import AddEmployeeScreen from "./AddEmployeeScreen";
import HomeIcon from "../assets/icons/HomeIcon";
import Icon from "react-native-vector-icons/FontAwesome";
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
import { TouchableOpacity } from "react-native-gesture-handler";

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
      <Tab.Screen
        name="Upload"
        component={UploadDocsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full ${
                focused ? "bg-[#2578CC]" : "bg-[#FFF]"
              } items-center justify-center`}
            >
              <HomeIcon fill={color} />
            </View>
          ),
          title: "Home",
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddDocsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <TouchableOpacity className="m-[-69px] items-center">
              <Icon name="plus-circle" size={105} color={"#2578CC"} />
            </TouchableOpacity>
          ),
          title: "Home",
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Preview"
        component={PreviewDocsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full ${
                focused ? "bg-[#2578CC]" : "bg-[#FFF]"
              } items-center justify-center`}
            >
              <MessageIcon fill={color} />
            </View>
          ),
          title: "Messages",
          tabBarShowLabel: false,
        }}
      />
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
